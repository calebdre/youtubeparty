if (Meteor.isClient) {

	var isLoggedIn = false;

	Template.dynamicTemplate.helpers({
		router:function(){
			 if(isLoggedIn){
					return Template.party;
				}else{
					return Template.splash;
				}
			}
	})
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
