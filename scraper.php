<?php
require 'vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\DomCrawler\Crawler;

// Check if a URL is provided as an argument to the script
if ($argc != 2) {
    die('Usage: php scraper.php <website_url>' . PHP_EOL);
}

// Get the URL from the command line argument
$url = $argv[1];

$client = new HttpBrowser(HttpClient::create());
$crawler = $client->request('GET', $url);

// Extract and process the data from the webpage
$scrapedData = [];

// Example: Scrape and populate the website name
$websiteName = $crawler->filter('h1, h2, h3')->first()->text();

// Example: Scrape and populate email addresses (search for text containing '@')
$emailAddresses = [];
$texts = $crawler->filter('body')->each(function (Crawler $node, $i) {
    return $node->text();
});

foreach ($texts as $text) {
    preg_match_all('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/', $text, $matches);
    $emailAddresses = array_merge($emailAddresses, $matches[0]);
}

// Now, let's scrape the additional data
$keyword = ''; // You can populate this if needed
$title = '';   // You can populate this if needed
$domain = '';  // You can populate this if needed
$metaDescription = ''; // You can populate this if needed

// Populate $scrapedData with all the scraped data
$scrapedData[] = [
    'Name' => $websiteName,
    'Email Address' => implode(', ', $emailAddresses),
    'Source' => $url,
    'Keyword' => $keyword,
    'Title' => $title,
    'Domain' => $domain,
    'Meta Description' => $metaDescription
];

if (empty($scrapedData)) {
    error_log('No data found'); // Log a message if no data is scraped
}

echo json_encode($scrapedData);
?>
