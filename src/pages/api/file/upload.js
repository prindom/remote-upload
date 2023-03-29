// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from 'next'
import {Deta, Drive} from "deta";

const deta = Deta("a04e75yrens_KhQjJm4oPhH2ukjKSw36MGWNuVEhVqkQ");
const drive = deta.Drive("drive01");
export default async function handler(req, res) {
    const url = req.query.url
    const response = await fetch(url)
    const buffer = Buffer.from(await response.arrayBuffer())
    let name = url.split('/').pop();
    // check if name has correct file extension
    // if not, add it
    const fileExtension = name.split('.').pop();
    if (fileExtension !== buffer.type) {
        name += "." + buffer.type;
    }

    const file = drive.put(name, {
        data: buffer,
        contentType: buffer.type
    });

    res.status(200).json({size: buffer.size, url: url, request: req.query})
}
