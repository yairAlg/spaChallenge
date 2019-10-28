# spaChallenge

The spaChallenge supports:
    -A drag and drop sortable list of items, which ones includes an img and a description text.
    -A counter that shows the amount of items being displayed.
    -The functionality to add new items.
    -The posibility to delete existing items (updating the counter).
    -Use of localStorage to keep the current data in case of a refresh action.
    
# Usage

I personally uploaded some imgs to the repository so you can try it without losing time searching for imgs but it supports any size.

The instructions are very simple, at the first time you can only click on Add Item.
Once pressed it the Add Item button hides and the Upload Image and the Add Text buttons are available, while the Submit button would show an alert if pressed without filling the item's components.

When an item is created successfully the Add Item button is visisble again while the input buttons hide. Also the Edit Item and the Delete Item buttons are available to use.

The Edit Item allows you to change the description text and the img of the current div.

The Delete Item erase the entire item from the displayed content, update the counter and the localStorage of the web page.

Having multiple items displayed at the same time allows you to drag and drop the items to sort the list of them as you please. When doing this the script updates the localStorage content. 

Because of the constant update of the localStorage data when a refresh action occurs the web page will still display the same content.

