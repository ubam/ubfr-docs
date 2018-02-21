
var Table = Table || (function Table(source) {
	this._source = null;
	this._json = null;
	this._element = null;
	this._entries = null;

	this.sortBy = null;
	this.sortAsc = true;
	this.filter = null;

	this.reload = () => {
		return new Promise((res, rej) => {
			if (this._source === null) {
				return rej('No source set');
			}
/*
			var xhr = new XMLHttpRequest();
			xhr.open('GET', this._source);
			xhr.send(null);
			xhr.onreadystatechange = () => {
				try {
					var DONE = 4; // readyState 4 means the request is done.
					var OK = 200; // status 200 is a successful return.
					if (xhr.readyState === DONE) {
						if (xhr.status === OK) {
							return res(JSON.parse(xhr.responseText));
						} else {
							return rej(xhr.status);
						}
					}
				} catch (e) {
					return rej(e);
				}
			};*/
			return res(JSON.parse(
				'{"head":{"name":"Name","functions":"Functions","rep+":"Additional Responsibilities","contact":"Contact"},"entries":[{"name":"Peter Nerlich","functions":["LC Germany","UBFR","UBAM"],"resp+":["creator/maintainer of UBAM GitHub"],"contact":{"telegram":"@peternerlich","email":"peter.nerlich+ubports@googlemail.com"}},{"name":"Wayne","functions":["LC Korea","UBFR","UBAM","(many more)"],"resp+":["does potentially everything in/around the community"],"contact":{"telegram":"@wayneoutthere"}},{"name":"Emanuele Sorce","functions":["LC Italy","UBFR","UBAM"],"resp+":[],"contact":{"telegram":"@TronFortyTwo"}},{"name":"Diogo Constantino","functions":["LC Portugal","UBAM"],"resp+":[],"contact":{"telegram":"@DiogoConstantino"}},{"name":"This","functions":["is"],"resp+":[],"contact":{"telegram":"@test"}}]}'
			));
		});
	};

	this.getSource = () => {
		return this._source;
	};
	this.setSource = (source) => {
		return new Promise((res, rej) => {
			if (typeof source === 'string') {
				let old = this._source;
				this._source = source;

				this.reload().then(obj => {
					this._json = obj;
					return res(source);
				}).catch(e => {
					this._source = old;
					return rej(e);
				});
			} else {
				return rej('No source set');
			}
		});
	};
	if (source) {
		this.setSource(source);
	}

	this.getElement = () => {
		return this._element;
	};


	this.update = () => {
		//filter entries
		if (typeof this.filter === 'string') {
			// global search
			entr:
			for (let e in this._entries) {
				// if any element has a match, show and continue with next element
				for (let t in this._entries[e].obj) {
					if (typeof this._entries[e].obj[t] === 'string') {
						if (this._entries[e].obj[t].toLowerCase().indexOf(this.filter) > -1) {
							this._entries[e].el.classList.remove('hidden');
						//	console.log('showing', this._entries[e].obj.name, ':', this.filter, 'in', this._entries[e].obj[t]);
							continue entr;
						}
					} else if (typeof this._entries[e].obj[t] === 'object') {
						for (let i in this._entries[e].obj[t]) {
							if (this._entries[e].obj[t][i].toLowerCase().indexOf(this.filter) > -1) {
								this._entries[e].el.classList.remove('hidden');
							//	console.log('showing', this._entries[e].obj.name, ':', this.filter, 'in', this._entries[e].obj[t][i]);
								continue entr;
							}
						}
					}
				}
			//	console.log('hiding', this._entries[e].obj.name, ':', this.filter, '!in', this._entries[e].obj);
				this._entries[e].el.classList.add('hidden');
				continue entr;
			}
		} else {
			entr:
			for (let e in this._entries) {
				for (let f in this.filter) {
					// if entry has not filter tag, hide
					//  else check if matches
					if (this.filter[f].tag in this._entries[e].obj) {
						if (typeof this._entries[e].obj[this.filter[f].tag] === 'string') {
							// if value is string, simple pattern match,
							//  if no match is found, hide and continue with the next entry
							if (this._entries[e].obj[this.filter[f].tag].toLowerCase().indexOf(this.filter[f].value) < 0) {
								this._entries[e].el.classList.add('hidden');
							//	console.log('hiding', this._entries[e].obj.name, ':', this.filter[f], '!in', this._entries[e].obj[this.filter[f].tag].toLowerCase());
								continue entr;
							}
						} else if (typeof this._entries[e].obj[this.filter[f].tag] === 'object') {
							// if value is array/object, pattern match all combinations of elements with filter value split by comma
							//  if a filter value element has no match across all array elements, hide and continue with the next entry
							let vals = this.filter[f].value.split(',').map(e => {return e.trim();});
							vals:
							for (let v in vals) {
								for (let i in this._entries[e].obj[this.filter[f].tag]) {
									if (this._entries[e].obj[this.filter[f].tag][i].toLowerCase().indexOf(vals[v]) > -1) {
										continue vals;
									}
								}
							//	console.log('hiding', this._entries[e].obj.name, ':', {tag: this.filter[f].tag, value: vals}, v, '!in', this._entries[e].obj[this.filter[f].tag].map(e => {return e.toLowerCase();}));
								this._entries[e].el.classList.add('hidden');
								continue entr;
							}
						}
					} else {
						this._entries[e].el.classList.add('hidden');
						continue entr;
					}
				}
			//	console.log('showing', this._entries[e].obj.name, ':', this.filter, 'matches', this._entries[e].obj);
				this._entries[e].el.classList.remove('hidden');
			}
		}

		//sort this._entries
		if (this.sortAsc) {
			this._entries.sort((a,b) => {
				return a.obj[this.sortBy] > b.obj[this.sortBy];
			});
		} else {
			this._entries.sort((a,b) => {
				return a.obj[this.sortBy] < b.obj[this.sortBy];
			});
		}

	//	console.log('sorted:', disp(this._entries));

		//order table rows accordingly
		this._element.tBodies[0].insertBefore(this._entries[0].el, this._element.tBodies[0].children[0]);
		for (let i = 1; i < this._entries.length-1; i++) {
			this._element.tBodies[0].insertBefore(this._entries[i].el, this._entries[i-1].el.nextSibling);
		}
	};

	this._clickedSort = (key) => {
		if (this.sortBy == key) {
			this.sortAsc = !this.sortAsc;
		} else {
			this.sortBy = key;
		}

		return this.update();
	};

	this._parseFilter = str => {
		return new Promise((res, rej) => {
			try {
				let f = str.match(/(^[^:;]*$|([^:; ]+):([^:;]+)(\s+|;|$))/gi);
				if (f === null) {
					if (str.trim() == '') {
						return res([]);
					} else {
						return rej(null);
					}
				}
				// check for global
				if (f[0].indexOf(':') === -1) {
					let pe = f[0].replace('  ', ' ');
					while (f[0] != pe) {
						f[0] = pe;
						pe = f[0].replace('  ', ' ');
					}
					f = f[0].trim().toLowerCase();
				} else {
					f = f.map(e => {
						let pe = e.replace('  ', ' ');
						while (e != pe) {
							e = pe;
							pe = e.replace('  ', ' ');
						}
						e = e.toLowerCase().split(':').map(e => {return e.trim();});
						return {tag: e[0], value: e[1]};
					});
				}
				return res(f);
			} catch (e) {
				return rej(e);
			}
		});
	}

	this.recreate = () => {
		return new Promise((res, rej) => {
			if (this._element === null) {
				return rej('Not created yet');
			}
			
			this._entries = [];
			this._element.innerHTML = '';

			let head = document.createElement('thead');
			let hrow = document.createElement('tr');
			for (let i in this._json.head) {
				let th = document.createElement('th');
				th.innerText = this._json.head[i];
				th.addEventListener('click', this._clickedSort.bind(this, i));
				th.classList.add('link');
				hrow.appendChild(th);
				if (!this.sortBy) {
					this.sortBy = i;
				}
			}
			head.appendChild(hrow);
			this._element.appendChild(head);

			let tbody = document.createElement('tbody');
			for (let e in this._json.entries) {
				let brow = document.createElement('tr');
				for (let i in this._json.entries[e]) {
					let td = document.createElement('td');
					td.innerHTML = (e => {
						if (typeof e === 'object') {
							if (typeof e.length === 'number') {
								return e.join(', ');
							} else {
								let o = '';
								for (let k in e) {
									o += '<em>'+k+':</em> '+e[k]+'<br>';
								}
								return o;
							}
						} else {
							return e;
						}
					})(this._json.entries[e][i]);
					brow.appendChild(td);
				}
				this._entries.push({obj: this._json.entries[e], el: brow});
				tbody.appendChild(brow);
			}
			this._element.appendChild(tbody);

			this.update();

			return res(this._element);
		});
	};

	this.create = () => {
		return new Promise((res, rej) => {
			if (this._element !== null) {
				return res(this._element);
			} else if (this._source === null) {
				return rej('No source set');
			} else {
				this._element = document.createElement('table');
				this.recreate().then(res).catch(rej);
			}
		});
	};

	return this;
});

var insertTable = (source, filter, parent) => {
	return new Promise((res, rej) => {
		let t = new Table();
		filter = !!filter;
		t.setSource(source).then(() => {
			t.create().then(e => {
				if (typeof parent === 'undefined') {
					let scripts = document.getElementsByTagName('script');
					scripts[scripts.length-1].replaceWith(e);
				} else {
					parent.appendChild(e);
				}

				if (filter) {
					let w = document.createElement('div');
					w.classList.add('blockwrapper');
					let i = document.createElement('input');
					i.type = 'text';
					i.autofocus = 'true';
					i.placeholder = i.title = 'tag:value next:tag';
					i.pattern = '(^[^:;]*$|([^:; ]+):([^:;]+)(\s+|;|$))';
					let valTimeout = null;
					i.addEventListener('input', ((i, e) => {
						t._parseFilter(i.value).then(f => {
							t.filter = f;
							t.update();
						}).catch(e => {
							clearTimeout(valTimeout);
							valTimeout = setTimeout(()=>{i.reportValidity();}, 1000);
						});
					}).bind(t, i));
					w.appendChild(i);
					e.parentElement.insertBefore(w, e);
				}

				return res(e);
			}).catch(rej);
		}).catch(rej);
	});
};


function disp(a) {
	return a.map(e => {
		return e.obj.name;
	});
}
