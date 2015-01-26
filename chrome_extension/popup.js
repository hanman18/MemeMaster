//global declaration
var Meme,Cat;
var rating = 0;
var meme_id;
var cat_id;

/* called when page loads first time */
window.onload = function(){

  //associate parse account
  Parse.initialize("EfZFq1ljZwCgYudEG4bkkLrSeUtJ9UxHyLHL6wYI", "DGtqZV6fc6o2hjn9UiuSJPe0p3dURcNv05hBgwFk");  

  var currentUser = Parse.User.current();
  
  if(currentUser) {
   			//gloabal definition
	  Meme = Parse.Object.extend("Meme");
	  Cat = Parse.Object.extend("Cat");

	  //setup default meme and cat (run only once)
	  //setupDefault();
	updateAddView();

};

//called when add page is saved
var addSave = function(){
  //save action
  var new_meme = {
    src: document.add_form.add_url.value,
    name: document.add_form.add_name.value,
    tag: document.add_form.add_tag.value,
    comment: document.add_form.add_comment.value,
    "rating": String(rating),
    cat: $('#add_catDrop').val()
  }
  var meme = new Meme();
  meme.save(new_meme,{
  success: function(object) {
  },
  error: function(model, error) {
    alert("addSave error");
  }
  });
};

//show add page in content view
var updateAddView = function(){
  //clear fields
  document.add_form.add_url.value="";
  document.add_form.add_name.value="";
  $("#add_tag").importTags("");
  document.add_form.add_comment.value="";
  for(i=1;i<6;i++){
    document.getElementById("add-rate-"+i).checked=false;
  }
  document.getElementById("add_imageViewer").src="pic/Placeholder.jpg";

  //fill in cat drop down info
  var add_catDrop = $("#add_catDrop");
  add_catDrop.empty();
  var cat_query = new Parse.Query(Cat);
  cat_query.find({
    success: function(results){
      for(i in results){
        add_catDrop.append($('<option></option>').val(results[i].get("name")).html(results[i].get("name")));
      }
    },
    error: function(error){
      alert("updateAddView error");
    }
  });
  rating=0;

  //bind events
  var as = document.getElementById("add-save");
  as.addEventListener("click",addSave,false);
  var ac = document.getElementById("add-cancel");
  // ac.addEventListener("click",updateAllCat,false);
  //switch stylesheets

  //show edit view only

};