import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string
    code: number
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    let name = req.query.name || null
    if (name === null || typeof name == 'object') {
      return res.status(200).json({message: '名字错误', code: 400, data: {} })
    }

    let email = req.query.email || null
    if (email === null || typeof email == 'object') {
      return res.status(200).json({message: '邮箱错误', code: 400, data: {} })
    }

    User.create({
      name,
      email,
    }).then(result => {
      res.status(200).json({ 
        message: '创建成功！',
        code: 200,
        data: result
      })
    }).catch(err => {
      console.log(`创建失败：${err}`);
      
      res.status(200).json({ 
        message: '创建失败！',
        code: 400,
        data: {}
      })
    })
  }