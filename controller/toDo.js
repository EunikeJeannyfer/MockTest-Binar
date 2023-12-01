const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { encryptPassword, checkPassword } = 
    require('../utils/auth.js')

module.exports = {
    async create(req, res){
        const todo = await prisma.toDo.create({ 
            data: { 
                id_user: req.body.id_user,
                judul: req.body.judul,
                deskripsi: req.body.deskripsi,
                deadline: new Date(req.body.deadline)
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data ditambahkan!',
            data: todo
        })
    },
    async get(req, res){
        const { search, page = 1, limit = 10  } = req.query;
        console.log(req.query);
        let result = await prisma.toDo.findMany({
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
    async update(req, res){
        const user = await prisma.toDo.update({
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
    async getToDoByUser(req, res){
        const { search, page = 1, limit = 10  } = req.query;
        console.log(req.query);
        let result = await prisma.toDo.findMany({
            where:{
                id_user: Number(req.params.id)
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
    async destroy(req, res){
        const user = await prisma.toDo.update({
            where:{
                id: Number (req.params.id)
            },
            data: {
                status: true
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: user
        })
    },
}

