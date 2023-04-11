import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string
    user: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    User.create({
      name: 'leon3',
      email: 'leon3@gmail.com'
    }).then(result => {
      res.status(200).json({ 
        message: '创建成功！',
        user: result
      })
    }).catch(err => {
      console.log(`创建失败：${err}`);
      
      res.status(200).json({ 
        message: '创建失败！',
        user: {}
      })
    })
  }