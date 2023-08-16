//Create Pixels

function createGrid(screenSize, pixelSize) {
  var newHtml = '';
  for (var i = 0; i < screenSize; i++) {
    newHtml = newHtml + "<span class='square'></span>";
  }
   $('#screen').html(newHtml);
   $('.square').css({
      'height': pixelSize + "px",
      'width': pixelSize +  "px"
    });
  //hover operation to draw if mouse 
  // is not clicked

  $('.square').hover(function() {
    curOp = parseFloat($(this).css('opacity'));
    $(this).addClass('highlighted');
    if (curOp < .775) {
      $(this).css('opacity', +.65)
    }
    if ((curOp <= .775) && (curOp >= .65)) {
      $(this).css('opacity', curOp + .025);
    }
    //Only draw when mouseup:
  }, function(e) {
    if (e.mouseup) {
      curOp = parseFloat($(this).css('opacity'));
      $(this).addClass('highlighted');
      if (curOp < .775) {
        $(this).css('opacity', +.65)
      }
      if ((curOp <= .775) && (curOp >= .65)) {
        $(this).css('opacity', curOp + .025)
      }
    } else if (e.which == 1) {
      curOp = parseFloat($(this).css('opacity'));
      $(this).css('opacity', 0);
    };
  });
  
  console.log('3');

};

//Reset grid

$('#clear').click(function(button) {
  $('.highlighted').animate({
    opacity: 0
  }, 1000);
  $(shake('#device'));
  setTimeout(function() {
    createGrid(screenSize, pixelSize);
  }, 1000);

});

//Shake animation

function shake(div) {
  var interval = 100;
  var distance = 10;
  var times = 6;
  $(div).css('position', 'relative');
  for (var iter = 0; iter < (times + 1); iter++) {
    $(div).animate({
      left: ((iter % 2 == 0 ? distance : distance * -1))
    }, interval);
  }
  $(div).animate({
    left: 0
  }, interval).stopPropagation();
}

//Toggle resolution menu

$('#resolution').click(function(button) {
  $(this).toggleClass('clicked');  
  if ($(this).hasClass('clicked')) {
    $('#res-container').show()
      } else {
    $('#res-container').hide();
    
  }
})

$('.low').click(function(label){
  
   createGrid(385,29)
})

$('.med').click(function(label){
  
 createGrid(1014,17)
 
})

$('.high').click(function(label){
	createGrid(2500,10)
})

$('.custom').click(function(label){
input("Please enter in pixel size")

	createGrid;
})

//Create grid on load

$(createGrid(1014, 17))
