class WidthShower{
	constructor(query){
		var block = document.querySelectorAll(query)[0];
		if (block){
			this.block = block,
			this.$block = jQuery(block);
			this.addEventHandlerOnResize();			
		}
	}
	addEventHandlerOnResize(){
		var self = this;
		jQuery(window).on('resize',function(){
			self.showBlockWidth();
		});
	}	
	showBlockWidth(){
		var blockWidth = this.$block.css('width');
		console.log(blockWidth);
	}
}