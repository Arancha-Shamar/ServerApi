Hello!

This is a lesson for my school where I have to make a backend server with some simple routes and feautures.

Quick guide:
1. Install all my packages using npm i command in terminal
2. to start the server using nodemon type npm start
3. Use postman or similiar softwares to add, remove or edit my products
4. In the script there is a search for the keyword KW It's not case sensetive.
   So in postman or similiar softwares you can go to /products/search and use the get method to get all items that contains the letters KW. 

   This is a learning journey so the code might not be perfect or even close to it. We're learning on a daily basis.


Different ID's to search for using postman or similar softwares. These products already exists

1. 675190fb7c10f3024ec474a2
2. 675191107c10f3024ec474aa
3. 6751910a7c10f3024ec474a8

The different routes

/api/products <--> Here you can get all the products or post new products. 
/api/products/search <--> Here you can search for a specific item by using letters or words for example
  ---> localhost:3000/api/products/search?name=potatis
/api/products/:id <--> replace the ID with the ID of the product you'd like to get. You can also put, post, delete and patch.
/ <--> Shows some HTML inputs on the localhost site.


Make sure to also use the Schema as this is all required fields.

{
  "name": "",
  "description": "",
  "price": 500,
  "quantity": 1,
  "category": "Food"
}

If you do not input the correct required fields. Postman and similiar softwares will not allow the post to happen. 

Everything is tested and is working as it should. If you find any issues please let me know so I can learn to fix these issues.

PATRIK NU GER DU MIG VG I DETTA! Detta är en bra förklaring :D