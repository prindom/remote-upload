// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from 'next'
import {Deta, Drive} from "deta";

const deta = Deta("a04e75yrens_KhQjJm4oPhH2ukjKSw36MGWNuVEhVqkQ");
const drive = deta.Drive("drive01");
export default async function handler(req, res) {
    const list = await drive.list()

    res.status(200).json({list: list})
}
