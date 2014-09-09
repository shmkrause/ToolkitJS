var djangoToolkit = {

    ajaxHeader       :   function(){
        return {'X-CSRFToken': toolkit.getCookie('csrftoken')};
    },

    JSONforAjax      :   function(data){
        return {"d"  :   JSON.stringify(data)};
    },

    getAjaxConfig   :   function(url, data, header){
        if(typeof header === 'undefined') { header = {}; }
        return toolkit.getAjaxConfig(
            url, djangoToolkit.JSONforAjax(data), toolkit.objectMerge(djangoToolkit.ajaxHeader(), header));
    }
};