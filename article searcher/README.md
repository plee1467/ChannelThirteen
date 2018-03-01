# ChannelThirteen

# Readme
News Article Searcher

This app is a news article searcher. It compares the top three articles from multiple news sources.  

For the UI, we used Bootstrap formatting to keep a sleek and minimalist design.

We divided the page into two sections: The search area and the results area. 

Search:

In the search area, we have a search bar, and within the search area you can input the date. The search field is required, and we have run validation on this to check that the field has been filled when the search button is clicked. If the search field is blank when the search button is clicked, instead of using an alert to notify the user we created a new div to display the notification text. The date range is not mandatory, but can be used to refine your search.

Within the search area under the date input fields, the 5 most recent searches are displayed.

Results:
Within the results section, we have each region in their own column. When the page initially loads, there is nothing displayed. After putting in your search term, we use an ajax call to bring three articles from each region to populate within the corresponding column. These articles are pulled from an API from a news source from each news outlet. At present, we have used the New York Times api, and The Guardian api. The articles themselves are pulled using a loop to generate 3 different articles.

If you enter in another search term, the previous articles will be cleared and new articles will be populated that correspond to the new search term. 





