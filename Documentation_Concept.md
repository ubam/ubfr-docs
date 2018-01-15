# UBFR Docs Concept

*Developing an organizational structure to use in a GitHub repo*

**Purpose:** The UBFR aims to create a documentation space separate from docs.ubports.com to have a cache of knowledge to point newcomers to on repeated questions. As this will naturally be almost exclusively aimed at newcomers, the information recorded will not go into technical detail or tackle more advanced problems, but display processes near to the start of a new users experience more detailled than the UBports Docs. To quickly re-discover already documented information and improve on existing one, or being able to create a new document after quickly determining a topic is not already available, the documentation must be managed in a very organized and clear fashion, especially with incrasing amounts of stored knowledge.

Current state:    **[ planning only ]**



## hosting

Apart from creating another website like docs.ubports.com and adopting the hassle to manage and maintain yet another system, the idea of just using a GitHub repository came up.
The repo could be something like http://github.com/ubports/ubfr
Depending on the planned usage, it is to discuss whether this repo should be public *(→ having quick links to point newcomers to on a recurring question, potentially greatly speeding up the process and relieving the UBFR)*. Either way, each member of the ubfr team will probably be an admin to freely use and manage the repo. It would be possible to have just one or two admins tasked with also supervising the quality of the changes, though the net benefits of that are more than questionable.


## brainstorming for structural concepts

### directory structure
```
/
|- Install
|   |- Fairphone 2 - FP2
|   |   \- [...]
|   |- Nexus 5 - hammerhead
|   |- One Plus One - bacon
|   |- BQ M10 HD - cooler
|   |- BQ M10 FHD - freiza
|   |- Legacy Devices
|   |   |- Nexus 10 - manta
|   |   |- BQ Aquaris E4.5 - krillin
|   |   |- BQ Aquaris E5 - vegetahd
|   |   |- Meizu MX4 - arale
|   |   |- Meizu PRO 5 - turbo
|   |   |- Nexus 4 - mako
|   |   \- Nexus 7 - flo
|   \- general.md
|- Applications
|- Initial Setup
\- README.md
```
I think these areas will dynamically grow once we have a github area to play around with.

### document structure

Use Markdown (\*.md) for all text documents to take advantage of minimal text editing and the GitHub md rendering engine: https://guides.github.com/features/mastering-markdown/

Since UBports documentation (docs.ubports.com) already uses ReadTheDocs to organize and display documentation, which is uses Gihub as 'backend' to store documentation, we could use it too to have a consistent layout and style. We can have i.e. www.github.com/ubports/ubfr-doc to manage ReadTheDocs pages and something like www.ubports.com/ubfr/ to access it

*[...]*


