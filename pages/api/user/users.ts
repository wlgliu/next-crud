import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string,
    code: number,
    data: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {

    // res.status(200).json({ data: process.env.DB_USER })

    User.findAll().then(result => {
      res.status(200).json({message: 'ok', code: 200, data: result })
    }).catch(err => {
      res.status(404).json({message: '获取失败', code: 404, data: [] })
      console.log(`获取所有用户出错：${err}`);
    })
    
}