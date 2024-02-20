<?php
require 'vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\DomCrawler\Crawler;

// Check if keyword and location are provided as arguments
if ($argc != 3) {
    die('Usage: php search_scraper.php <keyword> <location>' . PHP_EOL);
}

$keyword = $argv[1];
$location = $argv[2];

$httpClient = HttpClient::create();
$searchUrl = 'https://www.google.com/search?q=' . urlencode($keyword . ' ' . $location);
$response = $httpClient->request('GET', $searchUrl);

// Extract and process the data from the search results
$searchResults = [];

$htmlContent = $response->getContent();
$crawler = new Crawler($htmlContent);

// Example: Extract search results titles and URLs
$crawler->filter('.tF2Cxc')->each(function (Crawler $node) use (&$searchResults) {
    $title = $node->filter('h3')->text();
    $url = $node->filter('a')->attr('href');

    $searchResults[] = [
        'Title' => $title,
        'URL' => $url,
        'Keyword' => $keyword,
        'Location' => $location,
    ];
});

if (empty($searchResults)) {
    die('No search results found');
}

echo json_encode($searchResults);
