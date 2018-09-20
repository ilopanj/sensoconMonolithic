var smb = {

	layout: {},
	menu: {},
	menuLink: {},
	content: {},
	onLoad: function() {

        console.info('smb.onLoad()!!');
		smb.layout   = document.getElementById('smb-layout');
		smb.menu     = document.getElementById('smb-menu');
		smb.menuLink = document.getElementById('smb-menu-link');
		smb.content  = document.getElementById('smb-main');

		smb.menuLink.onclick = function (e) {
			smb.toggleAll(e);
		};

		smb.content.onclick = function(e) {
			if (smb.menu.className.indexOf('active') !== -1) {
				smb.toggleAll(e);
			}
		};

		$( "#smb-accordion" ).accordion();
	},

	toggleClass: function (element, className) {
			var classes = element.className.split(/\s+/),
				length = classes.length,
				i = 0;

			for(; i < length; i++) {
			  if (classes[i] === className) {
				classes.splice(i, 1);
				break;
			  }
			}
			// The className is not found
			if (length === classes.length) {
				classes.push(className);
			}

			element.className = classes.join(' ');
		},


	toggleAll: function(e) {
			var active = 'active';

			e.preventDefault();
			smb.toggleClass(smb.layout, active);
			smb.toggleClass(smb.menu, active);
			smb.toggleClass(smb.menuLink, active);
		}

};	

