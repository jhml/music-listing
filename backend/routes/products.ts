import { Router } from 'express';
import Product from '../models/Product';
import verify from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req: any, file: any, cb: any) {
    cb(null, 'cover-' + Date.now() + path.extname(file.originalname));
  },
});
//Limit file size to 5 MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req: any, file: any, cb: any) {
    checkFileType(file, cb);
  },
}).single('image');

function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
/* product routes */
router.get('/', async (req: any, res: any) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:productId', async (req: any, res: any) => {
  const id = req.params.productId;
  console.log(`[products:get] incoming request for id=${id}`);
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    console.error(
      `[products:get] error loading product id=${id}:`,
      err && err.stack ? err.stack : err,
    );
    return res.status(500).json({
      message: 'Failed to load product',
      error: err && err.message ? err.message : String(err),
    });
  }
});

router.post('/', verify, (req: any, res: any) => {
  upload(req, res, async (err: any) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!req.file) {
      return res.status(400).send({ message: 'No file selected' });
    }

    const product = Product.from({
      name: req.body.name,
      artist: req.body.artist,
      imageUrl: '/uploads/' + req.file.filename,
    });

    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (err) {
      res.status(400).send(err);
    }
  });
});

router.put('/:productId', verify, (req: any, res: any) => {
  upload(req, res, async (err: any) => {
    if (err) return res.status(400).send({ message: err });

    const update: any = {
      name: req.body.name,
      artist: req.body.artist,
    };

    if (req.file) {
      update.imageUrl = '/uploads/' + req.file.filename;
    }

    try {
      console.log('[products:put] update', req.params.productId, update);
      const updated = await Product.findByIdAndUpdate(
        req.params.productId,
        update,
      );
      console.log('[products:put] updated result:', updated);
      return res.json(updated);
    } catch (err) {
      console.error(
        '[products:put] error:',
        err && err.stack ? err.stack : err,
      );
      return res.status(500).send({
        message: 'Failed to update product',
        error: err && err.message ? err.message : String(err),
      });
    }
  });
});

router.delete('/:productId', verify, async (req: any, res: any) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productId });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
