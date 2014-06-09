/**
 * Namespace for static JS helper functions
 * dependencies:
 *      jQuery
 */
var toolkit = {
    $               :   jQuery.noConflict(),
    cache           :   {},
    /**
     * Checks the browser cookies for instance of name
     * @param name The cookie name
     * @returns mixed String cookie value or null
     */
    getCookie       :       function(name){
        var cookieValue = null;
        if(document.cookie && document.cookie.split(';')) {
            var cookies = document.cookie.split(';');
            for(var i =0; i < cookies.length; i++) {
                var cookie = toolkit.$.trim(cookies[i]);

                if(cookie.substring(0, name.length + 1) == name + '=') {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        } else {
            if (toolkit.isObject(toolkit.$('input[name="csrfmiddlewaretoken"]'))) {
                return toolkit.$('input[name="csrfmiddlewaretoken"]');
            }
        }

        return cookieValue;
    },

    querystring	    :       function(name){
        name = name.replace(/[\[]/, "\\\[").replace(/\[]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    /**
     * Reference table for (en/de)codeHTMLentities
     */
    entityTable     :       {
        34 : 'quot',        38 : 'amp',         39 : 'apos',        60 : 'lt',          62 : 'gt',          160 : 'nbsp',
        161 : 'iexcl',      162 : 'cent',       163 : 'pound',      164 : 'curren',     165 : 'yen',        166 : 'brvbar',
        167 : 'sect',       168 : 'uml',        169 : 'copy',       170 : 'ordf',       171 : 'laquo',      172 : 'not',
        173 : 'shy',        174 : 'reg',        175 : 'macr',       176 : 'deg',        177 : 'plusmn',     178 : 'sup2',
        179 : 'sup3',       180 : 'acute',      181 : 'micro',      182 : 'para',       183 : 'middot',     184 : 'cedil',
        185 : 'sup1',       186 : 'ordm',       187 : 'raquo',      188 : 'frac14',     189 : 'frac12',     190 : 'frac34',
        191 : 'iquest',     192 : 'Agrave',     193 : 'Aacute',     194 : 'Acirc',      195 : 'Atilde',     196 : 'Auml',
        197 : 'Aring',      198 : 'AElig',      199 : 'Ccedil',     200 : 'Egrave',     201 : 'Eacute',     202 : 'Ecirc',
        203 : 'Euml',       204 : 'Igrave',     205 : 'Iacute',     206 : 'Icirc',      207 : 'Iuml',       208 : 'ETH',
        209 : 'Ntilde',     210 : 'Ograve',     211 : 'Oacute',     212 : 'Ocirc',      213 : 'Otilde',     214 : 'Ouml',
        215 : 'times',      216 : 'Oslash',     217 : 'Ugrave',     218 : 'Uacute',     219 : 'Ucirc',      220 : 'Uuml',
        221 : 'Yacute',     222 : 'THORN',      223 : 'szlig',      224 : 'agrave',     225 : 'aacute',     226 : 'acirc',
        227 : 'atilde',     228 : 'auml',       229 : 'aring',      230 : 'aelig',      231 : 'ccedil',     232 : 'egrave',
        233 : 'eacute',     234 : 'ecirc',      235 : 'euml',       236 : 'igrave',     237 : 'iacute',     238 : 'icirc',
        239 : 'iuml',       240 : 'eth',        241 : 'ntilde',     242 : 'ograve',     243 : 'oacute',     244 : 'ocirc',
        245 : 'otilde',     246 : 'ouml',       247 : 'divide',     248 : 'oslash',     249 : 'ugrave',     250 : 'uacute',
        251 : 'ucirc',      252 : 'uuml',       253 : 'yacute',     254 : 'thorn',      255 : 'yuml',       402 : 'fnof',
        913 : 'Alpha',      914 : 'Beta',       915 : 'Gamma',      916 : 'Delta',      917 : 'Epsilon',    918 : 'Zeta',
        919 : 'Eta',        920 : 'Theta',      921 : 'Iota',       922 : 'Kappa',      923 : 'Lambda',     924 : 'Mu',
        925 : 'Nu',         926 : 'Xi',         927 : 'Omicron',    928 : 'Pi',         929 : 'Rho',        931 : 'Sigma',
        932 : 'Tau',        933 : 'Upsilon',    934 : 'Phi',        935 : 'Chi',        936 : 'Psi',        937 : 'Omega',
        945 : 'alpha',      946 : 'beta',       947 : 'gamma',      948 : 'delta',      949 : 'epsilon',    950 : 'zeta',
        951 : 'eta',        952 : 'theta',      953 : 'iota',       954 : 'kappa',      955 : 'lambda',     956 : 'mu',
        957 : 'nu',         958 : 'xi',         959 : 'omicron',    960 : 'pi',         961 : 'rho',        962 : 'sigmaf',
        963 : 'sigma',      964 : 'tau',        965 : 'upsilon',    966 : 'phi',        967 : 'chi',        968 : 'psi',
        969 : 'omega',      977 : 'thetasym',   978 : 'upsih',      982 : 'piv',        8226 : 'bull',      8230 : 'hellip',
        8242 : 'prime',     8243 : 'Prime',     8254 : 'oline',     8260 : 'frasl',     8472 : 'weierp',    8465 : 'image',
        8476 : 'real',      8482 : 'trade',     8501 : 'alefsym',   8592 : 'larr',      8593 : 'uarr',      8594 : 'rarr',
        8595 : 'darr',      8596 : 'harr',      8629 : 'crarr',     8656 : 'lArr',      8657 : 'uArr',      8658 : 'rArr',
        8659 : 'dArr',      8660 : 'hArr',      8704 : 'forall',    8706 : 'part',      8707 : 'exist',     8709 : 'empty',
        8711 : 'nabla',     8712 : 'isin',      8713 : 'notin',     8715 : 'ni',        8719 : 'prod',      8721 : 'sum',
        8722 : 'minus',     8727 : 'lowast',    8730 : 'radic',     8733 : 'prop',      8734 : 'infin',     8736 : 'ang',
        8743 : 'and',       8744 : 'or',        8745 : 'cap',       8746 : 'cup',       8747 : 'int',       8756 : 'there4',
        8764 : 'sim',       8773 : 'cong',      8776 : 'asymp',     8800 : 'ne',        8801 : 'equiv',     8804 : 'le',
        8805 : 'ge',        8834 : 'sub',       8835 : 'sup',       8836 : 'nsub',      8838 : 'sube',      8839 : 'supe',
        8853 : 'oplus',     8855 : 'otimes',    8869 : 'perp',      8901 : 'sdot',      8968 : 'lceil',     8969 : 'rceil',
        8970 : 'lfloor',    8971 : 'rfloor',    9001 : 'lang',      9002 : 'rang',      9674 : 'loz',       9824 : 'spades',
        9827 : 'clubs',     9829 : 'hearts',    9830 : 'diams',     338 : 'OElig',      339 : 'oelig',      352 : 'Scaron',
        353 : 'scaron',     376 : 'Yuml',       710 : 'circ',       732 : 'tilde',      8194 : 'ensp',      8195 : 'emsp',
        8201 : 'thinsp',    8204 : 'zwnj',      8205 : 'zwj',       8206 : 'lrm',       8207 : 'rlm',       8211 : 'ndash',
        8212 : 'mdash',     8216 : 'lsquo',     8217 : 'rsquo',     8218 : 'sbquo',     8220 : 'ldquo',     8221 : 'rdquo',
        8222 : 'bdquo',     8224 : 'dagger',    8225 : 'Dagger',    8240 : 'permil',    8249 : 'lsaquo',    8250 : 'rsaquo',
        8364 : 'euro'
    },


    /**
     * Encoder for HTML entities (Currently only converts unicode 00A0 - 2666)
     * Disclaimer: I didn't write this method.  Function was made available in stackoverflow (link below)
     * @link http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
     */
    encodeHTMLentities:     function(text){
        return text.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
            console.log(c);
            return '&' + (toolkit.entityTable[c.charCodeAt(0)] || '#'+ c.CharCodeAt(0))+';';
        });
    },

    decodeHTMLentities:   function(text){
        return toolkit.$('<div />').html(text).text();
    },

    isArray         :       function(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    isObject        :       function(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    },

    isNull          :       function(obj){
        return Object.prototype.toString.call(obj) === '[object Null]';
    },

    getPrototype    :       function(obj){
        return Object.prototype.toString.call(obj);
    },

    trim            :       function(str){
        str = str.replace(/^\s+/, '');
        for(var i = str.length -1; i>= 0; i--) {
            if(/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    },

    sizeOf          :       function(obj){
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) count++;
        }
        return count;
    },

    swap            :       function(arr, a, b) {
        var tmp=arr[a];
        arr[a]=arr[b];
        arr[b]=tmp;
    },

    objectMerge     :       function(obj1, obj2){
        if(!toolkit.isObject(obj1) || !toolkit.isObject(obj2)) {
            console.error("objectMerge accepts only objects as parameters, "+
                "given "+toolkit.getPrototype(obj1)+", "+toolkit.getPrototype(obj2));
            return;
        }
        var result = {};
        for (var p in obj1) { result[p] = obj1[p]; }
        for (var p in obj2) { result[p] = obj2[p]; }
        return result;
    },

    contains        :       function(needle, haystack, isKey, exact, caseSensitive){
        if(typeof isKey === 'undefined') isKey = false;
        if(typeof exact === 'undefined') exact = false;
        if(typeof caseSensitive === 'undefined') caseSensitive = false;

        var r = false;
        for(var prop in haystack) {
            if(!caseSensitive) {
                var search = exact ? "^" + needle + "$" : needle,
                    regex = new RegExp(search, "i");

                r = isKey && prop.search(regex) !== -1 || !isKey && haystack[prop].search(regex) !== -1;
            } else {
                r = exact ?
                    (isKey? needle === prop : needle === haystack[prop]) :
                    (isKey? prop.indexOf(needle) !== -1 : haystack[prop].indexOf(needle) !== -1);
            }

            if(r) {
                return haystack[prop];
            }
        }
        return null;
    },

    /**
     * Didn't write this, found it below
     * @param arr
     * @link http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
     */
    remove          :       function(arr){
        if(!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(what, i) {
                i = i || 0;
                var L = this.length;
                while (i < L) {
                    if(this[i] === what) return i;
                    ++i;
                }
                return -1;
            };
        }

        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    },

    validateDataType:   function(param, type, nullable){
        this.error = [],
            this.outcome = true;

        //Verify param data type is supported
        if(typeof param === 'undefined' && typeof param !== 'string' && !toolkit.isArray(param)) {
            this.error.push("Param is a required field and must be of type string or Object.  "+
                "Given: "+param.toString()+", type: "+toolkit.getPrototype(param));
        }

        //ensure type is set if param is not an object
        if(!toolkit.isArray(type) && typeof type !== 'string') {
            this.error.push("Type is required and must be of type String.  Given: "+type.toString()
                +", type: "+toolkit.getPrototype(type));
        }

        if(this.error.length) {
            for (var i in this.error) {
                console.error(this.error[i]);
            }
            return null;
        }

        if(typeof nullable === 'undefined') nullable = true;

        if(toolkit.isObject(param)) {
            outcome = {};
            var n = true;
            for(var i in param) {
                n = typeof param[i].nullable === 'undefined'? true : param[i].nullable;
                outcome[param[i].param.toString()] = toolkit.validateDataType(param[i].param, param[i].type, n);
            }
        } else {
            outcome = nullable ? toolkit.isNull(param) || typeof param === type : !toolkit.isNull(param) && typeof param === type;
        }
        return outcome;
    },


    getAjaxConfig   :   function(url, data, headers) {
        if(typeof headers === 'undefined') headers = {};
        if(typeof data === 'undefined') data = {};
        this.defaultConfig = {
            type:       'POST',
            url:        '',
            data:       {},
            headers:    {},
            cache:      false,
            error:      function(xhr, status, error){
                console.log(error);
            },
            success:    function(response){
                console.log(response);
            }
        };
        var validParams = toolkit.validateDataType(url, 'string', true)
//            && toolkit.isObject(data)
            && toolkit.isObject(headers);

        if(!validParams) {
            console.error("One or more passed parameters are invald.  "+
                "Expected string, object(optional), object(optional), "+
                "Given "+toolkit.getPrototype(url)+", "+toolkit.getPrototype(data)+", "+toolkit.getPrototype(headers));
            return;
        }

        return toolkit.$.extend({}, this.defaultConfig, {url : url, data : data, headers : headers});
    },

    modal       :   function(widget_container, options) {
        /*
         * Allow for flexibility in widget_container param (optional and multiple datatypes)
         */
        var container = null;
        if(typeof widget_container !== 'undefined'
            && (toolkit.isObject(widget_container) || toolkit.validateDataType(widget_container, 'string', false))) {

            if(toolkit.isObject(widget_container)) {
                container = widget_container;
            } else {
                container = toolkit.$(widget_container);
            }
        } else {
            console.error('toolkit.modal expects (optional) parameter of type object or string; given: '
                +toolkit.getPrototype(widget_container));
            return;
        }

        if(toolkit.isNull(container) || !toolkit.isObject(container)) {
            if(!toolkit.$('#dialog-container').length) {
                toolkit.$('body').prepend('<div id="dialog-container"></div>');
                container = toolkit.$('#dialog-container')
            }
        }

        var popup = {
            popup           :   container,
            options         :   {
                autoOpen        :   false,
                buttons         :   {},
                close           :   function(){},
                modal           :   true,
                height          :   350,
                width           :   350,
                draggable       :   false
            },
            loadOptions     :   function(options){
                if(!toolkit.isObject(options)) {
                    console.error("loadOptions expects param "+options
                        +" to be of type Object, given "+toolkit.getPrototype(options));
                }
                for(var i in this.options) {
                    if(options.hasOwnProperty(i)) {
                        this.options[i] = options[i];
                    }
                }
            },
            init            :   function(options){
                var instance = this;

                if(typeof options !== 'undefined') {
                    instance.loadOptions(options);
                }
                this.popup.dialog(this.options);

                instance.resizeWindow();
                toolkit.$(window).resize(function() { instance.resizeWindow(); });
            },
            resizeWindow    :   function(){
                var dWidth = toolkit.$(window).width() * 0.9;
                var dHeight = toolkit.$(window).height() * 0.9;
                this.popup.dialog('option', 'width', dWidth);
                this.popup.dialog('option', 'height', dHeight);
            }
        };

        /*
         * Optional options on create
         */
        if (typeof options !== 'undefined') {
            popup.loadOptions(options);
        }

        return popup;
    },

    gridview        :   function(data, options){
        if(typeof data === 'undefined') {
            console.error('toolkit.gridview requires data to work (first param left undefined)');
            return;
        }
        if(!toolkit.isArray(data)) {
            console.error('toolkit.gridview expects first parameter to be an array, given: '+toolkit.getPrototype(data));
            return;
        }

        if(!toolkit.isObject(data[0])) {
            console.error('toolkit.gridview expects first parameter to be array of objects, given array of '+toolkit.getPrototype(data[0]));
            return;
        }

        var gv = {
            data        :   data,
            cols        :   [],
            currPage    :   1,
            options     :   null,
            defaults     :   {
                isPaginated     :   false,
                pageSize        :   20,
                sortCol         :   "",
                sortDirection   :   "ASC",
                id              :   "",
                legend          :   "",
                additionalCols  :   {},
                "class"         :   "",
                style           :   "",
                blackList       :   []
            },

            resetOptions    :   function() {
                this.options = this.defaults;
            },

            loadOptions     :   function(options){
                if(toolkit.isNull(this.options)) this.resetOptions();
                if(!toolkit.isObject(options)) {
                    console.error("loadOptions expects param "+options
                        +" to be of type Object, given "+toolkit.getPrototype(options));
                }
                for(var i in this.options) {
                    if(options.hasOwnProperty(i)) {
                        if(i === 'pageSize' && options[i] < 1) {
                            console.error('toolkit.gridview: page size cannot be less than 1')
                        } else this.options[i] = options[i];
                    }
                }
            },

            sortByColumn    :   function(propName) {
                if(typeof propName === 'undefined') propName = this.options.sortCol;
                if(typeof this.data[0][propName] === 'undefined') return;

                var self = this;
                function partition(array, propName, begin, end, pivot) {
                    var store = begin,
                        pivotVal = array[pivot][propName];

                    toolkit.swap(array, pivot, end-1);
                    for(var i=begin; i<end-1; i++) {
                        if(self.options.sortDirection.toLowerCase() === 'asc') {
                            if(array[i][propName] <= pivotVal) {
                                toolkit.swap(array, ++store-1, i);
                            }
                        } else {
                            if(array[i][propName] >= pivotVal) {
                                toolkit.swap(array, ++store-1, i);
                            }
                        }
                    }
                    toolkit.swap(array, end-1, store);
                    return store;
                }
                function qsort(array, propName, begin, end) {
                    if(end-1 > begin) {
                        var pivot=begin+Math.floor(Math.random()*(end-begin));
                        pivot=partition(array, propName, begin, end, pivot);

                        qsort(array, propName, begin, pivot);
                        qsort(array, propName, pivot+1, end);
                    }
                }
                qsort(this.data, propName, 0, this.data.length);
            },

            init  :   function(params){
                if(toolkit.isNull(this.options)) this.resetOptions();
                if(typeof params !== 'undefined') this.loadOptions(params);

                //assign DOM id
                if(!this.options.id) this.options.id = 'gridview-' + Math.ceil(Math.random()*10000);

                //Get list of table cols
                for(var i in data[0]) {
                    if(data[0].hasOwnProperty(i)) this.cols.push(i);
                }

                //Sort data if necessary
                if(this.options.sortCol) this.sortByColumn();

                toolkit.cache[this.options.id] = {};
            },

            addColumn       :   function(position, content, label, style){
                this.options.additionalCols[position] = {content : content, label : label};
                if(typeof style !== 'undefined') {
                    this.options.additionalCols[position]["style"] = style;
                }
            },

            addColumns      :   function(colList) {
                for(var i in colList) {
                    this.options.additionalCols[i] = colList[i];
                }
            },

            createGridview  :   function(renderTo, empty){
                var html = this.getHTML(),
                    domElement = null;

                if(typeof renderTo !== 'undefined') {
                    if(toolkit.isObject(renderTo)) domElement = renderTo;
                    else if (toolkit.validateDataType(renderTo, 'string')) domElement = toolkit.$(renderTo);
                    else {
                        console.error('gridview.createGridview first param must be either a selector string'+
                            ' or a jQuery DOM object, given: '+toolkit.getPrototype(renderTo));
                        return;
                    }

                    if(typeof empty !== 'undefined' && empty) domElement.empty();

                    domElement.append(html);
                }
            },

            getHTML         :   function(){
                var cSize = toolkit.sizeOf(this.options.additionalCols),
                    colCount = 0,
                    tmp = [],
                    additionalCols = this.options.additionalCols,
                    html = '<table class="gridview'
                        + (this.options.class.length ? ' '+this.options.class : '') + '"'
                        + (this.options.id.length ? ' id="'+this.options.id+'"' : '') + '>'
                        + (this.options.legend.length ? '<legend>'+this.options.id+'</legend>' : '')
                        + '<tr class="thead">';

                //Column headers
                for(var i in this.cols) {
                    if(additionalCols.hasOwnProperty(++colCount -1)) {
                        //Insert user-defined cols
                        do {
                            var style = additionalCols[colCount-1].hasOwnProperty('style') ?
                                ' style="'+additionalCols[colCount-1]['style']+'"' : '';

                            html += '<th' + style + '>'+additionalCols[colCount-1]['label']+'</th>';

                        } while(additionalCols.hasOwnProperty(++colCount -1));
                    }

                    if(toolkit.contains(this.cols[i], this.options.blackList)) continue;

                    html += '<th onclick="toolkit.cache[\''+this.options.id+'\'].doSort(toolkit.$(this))">'
                        + this.cols[i] + '</th>';
                }

                //more column headers (in case there are user-defined cols that need to be tacked on end)
                if(colCount <= cSize + toolkit.sizeOf(this.data[0])) {
                    colCount = html.match(/<th/g).length;
                    for(var i in additionalCols) {
                        if(parseInt(i) <= colCount || !additionalCols[i].hasOwnProperty('label')) continue;

                        var style = additionalCols[i].hasOwnProperty('style') ?
                            ' style="'+additionalCols[i]['style']+'"' : '';

                        html += '<th' + style + '>' + additionalCols[i]['label'] + '</th>';
                    }
                }

                html += '</tr>' + this.getTableBody() + '</table>';

                //Pagination
                if(this.options.isPaginated) html += this.getNav();

                return html;
            },

            getTableBody    :   function(){
                if(this.data.length === 0) return;

                var cSize = toolkit.sizeOf(this.options.additionalCols),
                    additionalCols = this.options.additionalCols,
                    start = 0,
                    end = this.data.length - 1,
                    html = '',
                    colCount = 0,
                    tmp = [];

                if(this.options.isPaginated) {
                    start = (this.currPage -1) * this.options.pageSize;
                    end = Math.min(this.data.length, start+this.options.pageSize) -1;
                }

                for(var rows=start; rows<=end; rows++) {
                    colCount = 0;
                    var row_id = toolkit.contains("id", this.data[rows], true, true);

                    html += '<tr' + (row_id ? ' data-id="' + row_id + '"' : "") + '>';

                    //execute replace on templated content (user-defined cols)
                    for(var i in additionalCols) {
                        if(!additionalCols[i].hasOwnProperty('content')) continue;

                        tmp[i] = additionalCols[i]['content'].split('%');
                        if(toolkit.sizeOf(tmp[i]) > 1) {
                            for(var j =1; j<toolkit.sizeOf(tmp[i]); j+=2) {
                                if(this.data[rows].hasOwnProperty(tmp[i][j])) {
                                    tmp[i][j] = this.data[rows][ tmp[i][j] ];
                                } else {
                                    tmp[i][j] = '';
                                }
                            }
                        }
                        tmp[i] = tmp[i].join('');
                    }

                    //build table rows
                    for(var cols in this.data[rows]) {
                        if(additionalCols.hasOwnProperty(++colCount -1)) {
                            do {
                                html += '<td>' + tmp[colCount-1] + '</td>';
                            } while(additionalCols.hasOwnProperty(++colCount -1));
                        }

                        if(toolkit.contains(cols, this.options.blackList)) continue;

                        html += '<td>'+this.data[rows][cols]+'</td>';
                    }

                    if(colCount <= cSize+toolkit.sizeOf(this.data[0])) {
                        for(var i in additionalCols) {
                            if(i <= cSize || additionalCols[i].hasOwnProperty('content')) continue;

                            html += '<td>'+tmp[i]+'</td>';
                        }
                    }
                    html += '</tr>';
                }
                return html;
            },

            __pageNumberDisplay : function(lastPage){
                var nav = '<ul id="'+this.options.id+'-nav" class="gridview-nav">';
                //list out page numbers according to number of rows and pagination size
                for(var i=1; i<=lastPage; i++) {
                    nav += '<li ' + (i === this.currPage ? ' class="selected"' : '')
                        + ' onclick="toolkit.cache[\''+this.options.id+'\'].goTo(toolkit.$(this), '+i+')">'
                        + i + '</li>';
                }
                return nav+'</ul>';
            },

            getNav          :   function(){
                var lastPage = Math.ceil(this.data.length/this.options.pageSize),
                    nav = '<span id="'+this.options.id+'-previous" class="gridview-prev'
                        + (this.currPage === 1 ? ' disabled' : '') + '"'
                        + ' onclick="toolkit.cache[\''+this.options.id+'\'].previous(toolkit.$(this))"><</span> '
                        + '';

                nav += this.__pageNumberDisplay(lastPage);

                return nav + ' '
                    + '<span id="'+this.options.id+'-next" class="gridview-next'
                    + (this.currPage === lastPage ? ' disabled' : '') + '"'
                    + ' onclick="toolkit.cache[\''+this.options.id+'\'].next(toolkit.$(this))">></span> ';
            },

            updatePage      :   function(){
                var tbody = this.getTableBody(),
                    next = toolkit.$('#'+this.options.id+'-next'),
                    prev = toolkit.$('#'+this.options.id+'-previous');

                toolkit.$('#'+this.options.id+' tr:has(td)').remove();
                toolkit.$('#'+this.options.id).append(tbody);

                console.log();
                if(this.currPage === Math.ceil(this.data.length/this.options.pageSize)) {
                    next.addClass('disabled');
                } else next.removeClass('disabled');

                if(this.currPage === 1) {
                    prev.addClass('disabled');
                } else prev.removeClass('disabled');
            },

            next            :   function(caller){
                //Don't progress if last page is already displayed
                if(caller.hasClass('disabled') || this.currPage === caller.siblings('ul').children().length) return;

                //Advance to next page
                this.currPage++;
                this.updatePage();

                //update current page indicator
                $('#'+this.options.id+'-nav li.selected').removeClass('selected').next().addClass('selected');
            },

            previous        :   function(caller){
                if(caller.hasClass('disabled') || this.currPage === 1) return;

                //Get previous page
                this.currPage--;
                this.updatePage();

                //update current page indicator
                $('#'+this.options.id+'-nav li.selected').removeClass('selected').prev().addClass('selected');
            },

            goTo            :   function(caller, pageNum){
                //Make sure page is within range (safe-guard against front-end trolls)
                if(pageNum < 1 || pageNum > Math.ceil(this.data.length/this.options.pageSize)) return;

                //Update table data
                this.currPage = pageNum;
                this.updatePage();

                //Update nav page indicator
                $('#'+this.options.id+'-nav li.selected').removeClass('selected');
                $('#'+this.options.id+'-nav li:nth-child('+pageNum+')').removeClass('selected');
            },

            doSort          :   function(caller){
                //Update CSS for column (dirctionality indicator)
                var table = toolkit.$('#'+this.options.id);
                if(caller.hasClass('asc')) {
                    caller.removeClass('asc').addClass('desc');
                    this.options.sortDirection = 'DESC';
                } else {
                    caller.removeClass('desc').addClass('asc');
                    this.options.sortDirection = 'ASC';
                }

                toolkit.$('.asc').not(caller).removeClass('asc');
                toolkit.$('.desc').not(caller).removeClass('desc');

                //Update table data
                this.sortByColumn(caller.text());
                table.find('tr:has(td)').remove();
                table.append(this.getTableBody());
            }
        };

        if(typeof options !== 'undefined') gv.loadOptions(options);
        gv.init();
        toolkit.cache[gv.options.id] = gv;

        return gv;
    },

    uniqueObjectListVal :   function(propName, list) {
        var values = {},
            emptyString = false;
        for(var i in list) {
            if(!list[i].hasOwnProperty(propName) || list[i][propName] === "") emptyString = true;
            else if(!values.hasOwnProperty(list[i][propName])) values[list[i][propName]] = 1;
        }
        values = Object.keys(values);
        if(emptyString) values.push("");

        return values;
    },

    uniqueListVal       :   function(list) {
        var values = {},
            emptyString = false;
        for(var i in list) {
            if(list[i][propName] === "") emptyString = true;
            else if(!values.hasOwnProperty(list[i])) values[list[i]] = 1;
        }
        values = Object.keys(values);
        if(emptyString) values.push("");

        return values;
    },

    parseDate           :   function(dateString) {
        if(typeof dateString === "string") dateString = dateString.replace(/-/g, "/").replace(/,/g, "");
        return new Date(Date.parse(dateString));
    }
};
