<?php
/**
 * Plugin Name: World Content Hub
 * Plugin URI: https://example.com
 * Description: Headless CMS plugin for World Content Hub - provides REST API endpoints for countries and channels
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: world-content-hub
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register custom post types
add_action('init', 'wch_register_post_types');
function wch_register_post_types() {
    // Register Country post type
    register_post_type('wch_country', array(
        'labels' => array(
            'name' => 'Countries',
            'singular_name' => 'Country',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'countries',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-location',
    ));

    // Register Channel post type
    register_post_type('wch_channel', array(
        'labels' => array(
            'name' => 'Channels',
            'singular_name' => 'Channel',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'channels',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-video-alt',
    ));
}

// Register custom fields
add_action('init', 'wch_register_custom_fields');
function wch_register_custom_fields() {
    // Country fields
    register_rest_field('wch_country', 'country_code', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'country_code', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'country_code', $value);
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'ISO 3166-1 alpha-2 country code',
        ),
    ));

    register_rest_field('wch_country', 'description', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'description', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'description', $value);
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Country description',
        ),
    ));

    register_rest_field('wch_country', 'latitude', array(
        'get_callback' => function($post) {
            return floatval(get_post_meta($post['id'], 'latitude', true));
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'latitude', floatval($value));
        },
        'schema' => array(
            'type' => 'number',
            'description' => 'Country latitude',
        ),
    ));

    register_rest_field('wch_country', 'longitude', array(
        'get_callback' => function($post) {
            return floatval(get_post_meta($post['id'], 'longitude', true));
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'longitude', floatval($value));
        },
        'schema' => array(
            'type' => 'number',
            'description' => 'Country longitude',
        ),
    ));

    // Channel fields
    register_rest_field('wch_channel', 'channel_id', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'channel_id', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'channel_id', $value);
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'YouTube channel ID',
        ),
    ));

    register_rest_field('wch_channel', 'country_code', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'country_code', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'country_code', $value);
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Associated country code',
        ),
    ));

    register_rest_field('wch_channel', 'subscribers', array(
        'get_callback' => function($post) {
            return intval(get_post_meta($post['id'], 'subscribers', true));
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'subscribers', intval($value));
        },
        'schema' => array(
            'type' => 'integer',
            'description' => 'Channel subscriber count',
        ),
    ));

    register_rest_field('wch_channel', 'videos', array(
        'get_callback' => function($post) {
            return intval(get_post_meta($post['id'], 'videos', true));
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'videos', intval($value));
        },
        'schema' => array(
            'type' => 'integer',
            'description' => 'Total video count',
        ),
    ));

    register_rest_field('wch_channel', 'url', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'url', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'url', $value);
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Channel URL',
        ),
    ));
}

// Enable CORS for REST API
add_filter('rest_pre_serve_request', 'wch_enable_cors');
function wch_enable_cors($value) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    return $value;
}

// Plugin activation hook
register_activation_hook(__FILE__, 'wch_activate_plugin');
function wch_activate_plugin() {
    wch_register_post_types();
    flush_rewrite_rules();
}

// Plugin deactivation hook
register_deactivation_hook(__FILE__, 'wch_deactivate_plugin');
function wch_deactivate_plugin() {
    flush_rewrite_rules();
}
