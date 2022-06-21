<?php
/**
 * Plugin Name: Nrby Events
 * Description: Plugin to integrate with your Nrby.io hosted events and make inserting event widgets into your Wordpress site quick and easy.
 * Author: Nrby.io
 * Author URI: https://nrby.io/event-creators/
 * Plugin URI: https://nrby.io
 * Version: 1.0.0
 * License: GPL2+
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

function nrby_register_custom_menu_page() {
    $menu_slug = plugins_url( 'nrby-portal-about.php', __FILE__);

    add_menu_page(
        'Nrby Events',
        'Nrby Events',
        'read',
        $menu_slug,
        '',
        plugins_url( 'images/NrbyTinyLogo.png', __FILE__),
        6
    );

    add_submenu_page($menu_slug, 'Instructions', 'Instructions', 'manage_options', $menu_slug, 'nrby_render_about');
}


add_action( 'admin_menu', 'nrby_register_custom_menu_page' );

function nrby_render_about(){
    echo "<div style=\"background: white\">
        <div style=\"padding: 25px; font-size: 16px\">
            <h2>
                About Nrby Events
            </h2>
            <div style=\"padding-bottom: 15px\">
                Welcome to Nrby! We do everything we can to make it easier for you to host your events. Whether you want to host an event that is free or one that is ticketed, our platform can meet your needs. 
                We bring our events to our mobile app that makes your event accessible to anyone that uses it. We provide on the fly analytics of how your event compares to other events happening around you so you can host 
                your event on the day that makes the most sense to you.

                <div style=\"padding-top: 15px\">
                    <strong>This plugin is not meant as a replacement to our web app, but instead it is meant to supplement your ability to import your hosted event from our platform over to your WordPress website.</strong>
                </div>
            </div>

            <div style=\"padding-bottom: 15px\">
                To get started please go to https://portal.nrby.io/sign-up to signup up for an account to create events in our platform.
                <br/>
                <br/>
                <img src=";
        echo plugins_url( 'images/EventCreatorPortalSignupPage.PNG', __FILE__ );
        echo" style=\"width: 70%\"/>
            </div>

            <div style=\"padding-bottom: 15px\">
                After you signup for an account in our website and verify it in your email. Upon your first login, you will be prompted to complete the setup of your account through an onboarding pop-up. If you 
                should chose to opt in for paid ticketing, then be sure to follow through the organization setup to the end. If you do not, then you won't be able to host events with paid ticketing. 

                <div style=\"padding-top: 15px\">
                    <img src=";
                    echo plugins_url( 'images/NrbyOnboardingPart1.PNG', __FILE__ );
                    echo" style=\"width: 70%\"/>
                </div>
                <div style=\"padding-top: 15px\">
                    Once onboarding is completed, you can start adding your events!
                </div>
                <div style=\"padding-top: 15px\">
                    <img src=";
                    echo plugins_url( 'images/OnboardingSuccessful.PNG', __FILE__ );
                    echo" style=\"width: 70%\"/>
                </div>
            </div>
            
            <div style=\"padding-bottom: 15px\">
                You can use our built in widget on any of the editor pages in order to import your event from our website.
                <br/><br/>
                <img src=";
                echo plugins_url( 'images/WordPressWidgetEditor.PNG', __FILE__ );
                echo" style=\"width: 70%\"/>
            </div>

            <div style=\"padding-bottom: 15px\">
                Our widget can be clicked and dragged to the location on the screen you want your event(s) to be displayed, or you can add it the same way you would add any other widget to your page depending on the version of Wordpress you are using.
                
                
                <div style=\"padding-top: 15px\">
                    You will be prompted to login with the same credentials that you used to sign up for the Nrby Portal.
                </div>
                
                <div style=\"padding-top: 15px\">
                    <img src=";
                    echo plugins_url( 'images/WordPressNrbyLogin.PNG', __FILE__ );
                    echo" style=\"width: 70%\"/>
                </div>
            </div>

            <div style=\"padding-bottom: 15px\">
                If you haven't already, open the events view with \"Show Events Table\" button. Please click on any of the checkboxes to the events that you want to import through the \"Widget\" column (circled in green). Once you have selected all the events you want to import, click the \"Events Widget\" button
                (circled in red). 
                <br/><br/>
                <img src=";
                echo plugins_url( 'images/SelectEventToImportOver.PNG',  __FILE__);
                echo" style=\"width: 70%\"/>
            </div>
            
            <div style=\"padding-bottom: 15px\">
                After you click the \"Events Widget\" button the Widget popup will appear. From here you can make adjustments to how you want your widget to appear in your website after you import it. Take note of the \"Import Events\" button (circled in red). This button will import your widget to your Wordpress site in the space above the
                \"Hide Events Table\" button.
                <br/><br/>
                <img src=";
                echo plugins_url( 'images/NrbyWidgetPopup.PNG',  __FILE__ );
                echo" style=\"width: 70%\"/>
            </div>

            <div style=\"padding-bottom: 15px\">
                After you click the Import Events button, you will see the widget previewed in your website. Click the \"Update\" or \"Save\" button (circled red) in Wordpress to make the widget permanent. 
                <strong>Note: The table and Show/Hide Event Table button will not display in your final website. That is only for the editor screen.</strong>
                <br/><br/>
                <img src=";
                echo plugins_url( 'images/ImportedEventsView.PNG', __FILE__ );
                echo" style=\"width: 70%\"/>
            </div>

            <div style=\"padding-bottom: 15px\">
                Now that your event(s) widget is saved to your page. If you direct yourself to the live version of your page you will see that the widget is visible to the public!
                <br/><br/>
                <img src=";
                echo plugins_url( 'images/EventWidgetFinalFrontView.PNG',  __FILE__);
                echo" style=\"width: 70%\"/>
            </div>

            <div style=\"padding-bottom: 15px\">
                Thats it! If you would like to know more about Nrby, please go to our website at https://nrby.io. 
            </div>
        </div>
    </div>";
}


