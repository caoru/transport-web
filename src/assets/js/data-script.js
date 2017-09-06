
var jqueryNoConflict = jQuery;

//begin main function
//jqueryNoConflict(document).ready(function(){
//  retriveData('#data-details', 'dataDetailsTemplate.handlebars', 'cars');
//});
//end main function

// grab data
function retriveData(inElement, template, api) {
  var dataSource = 'http://transport-api.frag.kr/' + api;
  var templateSource = 'handlebars/' + template;

  //$.ajaxSetup({
  //  headers : {
  //    'Authorization' : localStorage.getItem('token') 
  //  }
  //});

  //jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
  //jqueryNoConflict.getJSON(dataSource, function(data, textStatus, xhr){
  //  handlebarsDebugHelper();
  //  renderHandlebarsTemplate(inElement, template, data);
  //});

  $.ajax({
    type: 'GET',
    url: dataSource,
    headers : {
      'Authorization' : localStorage.getItem('token') 
    },
    async: false,
    success: function(data, textStatus, xhr) {
      if (xhr.status == 200) {
        handlebarsDebugHelper();
        renderHandlebarsTemplate(inElement, templateSource, data);
      }
    }
  });
};

// render compiled handlebars template
//function renderDataVisualsTemplate(data){
//  handlebarsDebugHelper();
//  renderHandlebarsTemplate('#data-details', 'dataDetailsTemplate.handlebars', data);
//};

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
  var source, template;
  jqueryNoConflict.ajax({
    url: path,
    success: function (data) {
      source = data;
      template = Handlebars.compile(source);
      if (callback) callback(template);
    }
  });
};

// function to compile handlebars template
function renderHandlebarsTemplate(inElement,withTemplate,withData){
  getTemplateAjax(withTemplate, function(template) {
    jqueryNoConflict(inElement).html(template(withData));
  })
};

// add handlebars debugger
function handlebarsDebugHelper(){
  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
  });
};

