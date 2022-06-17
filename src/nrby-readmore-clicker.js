(function($) {
    $(document).ready(function(){

        $('.use-read-more-hidden').each(function() {
            
            var id = $(this).attr("id");

            var uniqueId = id.replace("use-read-more-hidden-", "");

            var useReadMore = $(this).val() == "true";

            var $container = $('#read-more-container-' + uniqueId);

            if(useReadMore){
                $container.css("display", "none");
            }
            else{
                $container.css("display", "inline-block");
            }
        });
        
        // Add a click handler to just these buttons
        $('.read-more-btn').click(function() {
            var id = $(this).attr("id");

            var uniqueId = id.replace("read-more-btn-", "");

            var $container = $('#read-more-container-' + uniqueId);

            var display = $container.css("display");

            if(display == "none"){
                $container.css("display", "inline-block");
            }
            else{
                $container.css("display", "none");
            }
        })
    });
})(jQuery);