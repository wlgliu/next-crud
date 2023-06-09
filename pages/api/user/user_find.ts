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
    let userId = req.query.userId || null
    if (userId === null || typeof userId == 'object') {
      return res.status(200).json({message: '参数错误', code: 400, data: {} })
    }
    User.findByPk(userId).then(result => {
      res.status(200).json({message: '查询成功', code: 200, data: result })
    }).catch(err => {
      console.log(`获取所有用户出错：${err}`);
    })
}