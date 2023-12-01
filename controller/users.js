const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { encryptPassword, checkPassword } = 
    require('../utils/auth')
const { JWTsign } = 
    require('../utils/jwt')

module.exports = {
    async create(req, res){
        const user = await prisma.user.create({ 
            data: { 
                nama: req.body.nama,
                email: req.body.email,
                password: await encryptPassword(req.body.password),
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data ditambahkan!',
            data: user
        })
    },
    async get(req, res){
        const { search, page = 1, limit = 10  } = req.query;
        console.log(req.query);
        let result = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy:{
                id: 'asc'
            }
        })
        
        if(!result.length) {
            return res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Data Empty'
            })
        }

        return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: result
        })
    },
    async getById(req, res){
        //menampilkan user by ID
        if(!req.params.id) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
    
        const user = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
    
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: user
        })
    },
    async update(req, res){
        const user = await prisma.user.update({
            where:{
                id: Number (req.params.id)
            },
            data: req.body
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: user
        })
    },
    async login(req, res){
        const {email, password} = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        })

        if(!user){
            return res.status(404).json({
                status: "Fail!",
                message: "Email tidak ditemukan!"
            })
        }

        const isPasswordCorrect = await checkPassword(
            password, user.password
        )

        if(!isPasswordCorrect){
            return res.status(401).json({
                status: "Fail!",
                message: "Password Salah!"
            })
        }
        delete user.password 
        const token = await JWTsign(user)

        const todo = await await prisma.toDo.findFirst({
            where: {
                id_user : user.id
            }
        })

        return res.status(201).json({
            status: "Success!",
            message: "Berhasil Login!",
            data: { todo, token }
        })
    },
    registerForm: async (req, res, next) => {
        try{
            const {email, password, nama} = req.body;
            console.log(req.body);
            const user = await prisma.user.findFirst({
                where: { email }
            })

            if(user){
                // req.flash("error", "Email sudah terdaftar!")
                return res.redirect('/register')
            }
            const createUser = await prisma.user.create({
                data: {
                    email,
                    nama,
                    password: await encryptPassword(password)
                }
            });

            // req.flash("success", "Berhasil Register!")
            return res.redirect('/login')
        }catch(e){
            next(e) // untuk mengirim error ke middleware dan ditampilkan di ejs
        }
    },
}

