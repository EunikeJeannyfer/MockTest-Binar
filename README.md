# Mock_Test
1. JSON merupakan kepanjangan dari JavaScript Object Notation. Dalam Rest API, JSON berguna sebagai format pertukaran data dari server/database ke clent maupun sebaliknya melalui sebuah API.
2. REST API menjadi jembatan antara client dengan database. Cara kerjanya melalui URL atau endpoint yang dianggap sebagai request yang kemudian dikirimkan kepada server dan setelah mendapat respon dari server, respon tersebut diteruskan kepada aplikasi/client terkait.

ENDPOINT yang dibuat :
-
1. /getUsers  --> digunakan untuk mendapatkan semua data user 
2. /getUsers/:id --> digunakan untuk mendapatkan data user dengan id tertentu
3. /updateUsers/:id --> digunakan untuk update data user dengan id tertentu 
4. /login --> digunakan untuk login halaman website dan mendapatkan token untuk fitur autentikasi 
5. /register --> digunakan untuk register 
6. /getTodo
7. /updateTodo/:id
8. /addTodo
9. /getTodo/:id  
10. /login untuk load halaman login.ejs
11. /register untuk load halaman register.ejs


Jika dilakukan login melalui website, maka akan diperoleh token dan juga todo user tersebut. 
Register juga dapat dilakukan melalui website
