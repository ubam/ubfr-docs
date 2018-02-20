
var Table = Table || (function Table(source) {
	this._source = null;
	this._json = null;
	this._element = null;
	this._entries = null;

	this.sortBy = null;
	this.sortAsc = true;

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
							res(JSON.parse(xhr.responseText));
						} else {
							rej(xhr.status);
						}
					}
				} catch (e) {
					rej(e);
				}
			};*/
			res(JSON.parse('{"head": {"name": "Name","functions": "Functions","rep+": "Additional Responsibilities","contact": "Contact"},"entries": [{"name": "Peter Nerlich","functions": ["LC Germany", "UBFR", "UBAM"],"resp+": ["creator/maintainer of UBAM GitHub"],"contact": {"telegram": "@peternerlich","email": "peter.nerlich+ubports@googlemail.com"}},{"name": "This","functions": ["is"],"resp+": [],"contact": {"telegram": "@","email": "test"}}]}'));
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
					res(source);
				}).catch(e => {
					this._source = old;
					rej(e);
				});
			} else {
				rej('No source set');
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
		//TODO

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

		//order table rows accordingly
		this._element.tBodies[0].insertBefore(this._entries[0].el, this._element.tBodies[0].children[0]);
		for (let i = 1; i < this._entries.length-1; i++) {
			this._element.tBodies[0].insertBefore(this._entries[i].el, this._entries[i-1].el);
		}
	};

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

			res(this._element);
		});
	};

	this.create = () => {
		return new Promise((res, rej) => {
			if (this._element !== null) {
				res(this._element);
			} else if (this._source === null) {
				rej('No source set');
			} else {
				this._element = document.createElement('table');
				this.recreate().then(res).catch(rej);
			}
		});
	};

	return this;
});

var insertTable = (source, parent) => {
	return new Promise((res, rej) => {
		let t = new Table();
		t.setSource(source).then(() => {
			t.create().then(e => {
				if (typeof parent === 'undefined') {
					let scripts = document.getElementsByTagName('script');
					scripts[scripts.length-1].replaceWith(e);
				} else {
					parent.appendChild(e);
				}
				res(e);
			}).catch(rej);
		}).catch(rej);
	});
};

