var displayed_section = "";

// function to fix the page when scrolling by section
function scrollToClosestSection(closest_section)
{
    if($(closest_section).attr("class") !== $(displayed_section).attr("class"))
    {
        //scrollTo(0, $(closest_section).offset().top);

        //animate scroll to closest section
        $('html, body').animate({
            scrollTop: $(closest_section).offset().top
        }, 1000);
        
        displayed_section = closest_section;
    }
}

function findClosestSectionByScrollingPosition(scroll_position)
{
    var closest_section = null;
    var closest_section_distance = 1000000;
    $.each($('.section'), function(index, section) {
        var section_distance = Math.abs(scroll_position - $(section).offset().top);
        if (section_distance < closest_section_distance) {
            closest_section = section;
            closest_section_distance = section_distance;
        }
    });
    return closest_section;
}

function retrieveScrollPosition()
{
    return $(window).scrollTop();
}

// Detects if scroll is happening up or down
function detectScrollDirection()
{
    var scroll_position = retrieveScrollPosition();
    var closest_section = findClosestSectionByScrollingPosition(scroll_position);
    var scroll_direction = "";
    if (scroll_position > $(closest_section).offset().top) {
        scroll_direction = "down";
    } else {
        scroll_direction = "up";
    }
    return scroll_direction;
}

// Event that listens to user scrolling and calls findClosestSectionByScrollingPosition then use FixPage
$(window).scroll(function()
{
    var scroll_position = retrieveScrollPosition();
    var closest_section = findClosestSectionByScrollingPosition(scroll_position);
    scrollToClosestSection(closest_section);
});