# IRMA
IRMA is a fortune teller that will can predict with an accuracy of ~70% your next move at rock-paper-sissor.
You can try the game [here](https://irma.netlify.com), but be careful of the spell that could be cast on you if you beat her...

You can user the j-k-l buttons on your keyboard to play faster.

# Technical part
So IRMA is just a statistical computing algorithm that learn from the player. It register every move and try to predict the next one based on the previous successions of moves, if you think you can be smarter than her, try to be bellow 50% accuracy after 500 moves. 

An human beeing is not able to deliver true randomness, and IRMA know it. Let's say for exemple the 11 first moves an user could have made:
```
["📝", "✂️", "✂️", "📝", "✂️", "📝", "📝", "📝", "📝", "📝", "✂️", "📝", "📝", "✂️", "📝", "📝", "✂️", "📝", "📝", "✂️"]
```
They seems pretty random and it seems like it would be really difficult to predict the next move of the user.
Now let's try to divide this list in 3-grams, the 3-grams is the list of all successions of 3 choices that were made by the user. Here it would be :

```
["📝", "✂️", "✂️"]
["✂️", "✂️", "📝"]
["✂️", "📝", "✂️"]
["📝", "✂️", "📝"]
["✂️", "📝", "📝"]
["📝", "📝", "📝"]
["📝", "📝", "📝"]
["📝", "📝", "📝"]
["📝", "📝", "✂️"]
["📝", "✂️", "📝"]
["✂️", "📝", "📝"]
["📝", "📝", "✂️"]
["📝", "✂️", "📝"]
["✂️", "📝", "📝"]
["📝", "📝", "✂️"]
["📝", "✂️", "📝"]
["✂️", "📝", "📝"]
["📝", "📝", "✂️"]
```
Still seems pretty random, but maybe you can already see some pattern. That is because, even for only 20 values I struggled to create random data, fearing to repeat myself, and yet I still repeated myself without realising it.

Now let's take the last 2 values : `["📝", "✂️"]` and filter out all the grams that do not start with those values:
```
["📝", "✂️", "📝"]
["📝", "✂️", "📝"]
["📝", "✂️", "📝"]
```
As we can see I have the tendency to put a `"📝"` after writing `["📝", "✂️"]`, so IRMA will play `"📝"`. Now do this but with a lot of data and several grams sizes and you have a fully fonctionning IRMA.
