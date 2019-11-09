# IRMA
IRMA (Invicible Rock-paper-sissor Medium Algorithm) is a fortune teller that will can predict with an accuracy of ~70% your next move at rock-paper-sissor.
You can try the game [here](https://irma.netlify.com), but be careful of the spell that could be cast on you if you beat her...
You can also use the j-k-l buttons on your keyboard to play faster.

# Technical part
So IRMA is just a statistical computing algorithm that learn from the player. She remember every moves and try to predict the next one based on the previous successions. If you think you can be smarter than her and generate random move, try to stay bellow 50% accuracy after 100 moves. 
Human beeings are not able to deliver true randomness, and IRMA know it. Let's take for exemple the 20 first moves an user (me) made:
```
["📝", "✂️", "✂️", "🗿", "✂️", "📝", "🗿", "📝", "🗿", "🗿", "✂️", "🗿", "📝", "✂️", "📝", "🗿", "✂️", "📝", "🗿", "✂️"]
```
It looks pretty random and it seems like it would be really difficult to predict my next move.
Now let's try to divide this list in 3-grams, the 3-grams is the list of all successions of 3 choices that were made by the user. 
This is not the same as dividing the list by groups of 3, for exemple the list `[a, b, c, d]` would produce 2 grams: `[a, b, c]` and `[b, c, d]`.

Here we have :
```
["📝", "✂️", "✂️"]
["✂️", "✂️", "🗿"]
["✂️", "🗿", "✂️"]
["🗿", "✂️", "📝"]
["✂️", "📝", "🗿"]
["📝", "🗿", "📝"]
["🗿", "📝", "🗿"]
["📝", "🗿", "🗿"]
["🗿", "🗿", "✂️"]
["🗿", "✂️", "🗿"]
["✂️", "🗿", "📝"]
["🗿", "📝", "✂️"]
["📝", "✂️", "📝"]
["✂️", "📝", "🗿"]
["📝", "🗿", "✂️"]
["🗿", "✂️", "📝"]
["✂️", "📝", "🗿"]
["📝", "🗿", "✂️"]
```
Still looks pretty random, but maybe you can already see some pattern. That is because, even for only 20 values I struggled to create random data, fearing to repeat myself, and yet I still did without realising it.

Now let's take the last 2 values : `["🗿", "✂️"]` and filter out all the grams that do not start with those values:
```
["🗿", "✂️", "📝"]
["🗿", "✂️", "🗿"]
["🗿", "✂️", "📝"]
```
As we can see I have the tendency to put a `"📝"` after writing `["🗿", "✂️"]`, so IRMA will play `"🗿"`. Now do this but with a lot of data and several grams sizes and you have a fully fonctionning IRMA.

# Conclusion

IRMA is not deep learning, but it can still be considered machine learning. Unlike deep learning it does not require a lot of computing power, to prove this, IRMA run solely in the frontend with Javascript.
It can be a good alternative for developpers who want to implement a bit of "magical" intelligence to their frontend easily without extreme statistical knowledge and without deep learning disadvantages.

# License
Copyright (c) 2019, Hackages 
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies,
either expressed or implied, of the IRMA project.
