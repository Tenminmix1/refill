import { NextFunction, Request, Response } from 'express';
import { Blumo } from '../models/dashboard.model';
import { Donator } from '../models/donator.model';
import { Mailer } from '../../_helpers/mailer';
import { getDistance } from 'geolib';

export class DashboardController {

  public static kpis(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: true });
  }

  public static async donators(req: Request, res: Response, next: NextFunction) {
    const donators = await Donator.find({
      'timeSlots.date': { '$eq': req.query.date }
    });
    return res.status(200).json({ donators: donators });
  }

  // public static async blumo(req: Request, res: Response, next: NextFunction) {
  //   let currentBlumo = null;
  //   if ((req.body.id).toString().match(/^[0-9a-fA-F]{24}$/)) {
  //     currentBlumo = await Blumo.findById(req.body.id);
  //   }
  //   if (currentBlumo) {
  //     currentBlumo.radius = req.body.options.radius;
  //     currentBlumo.location.coordinates = [req.body.options.lat, req.body.options.lng];
  //     currentBlumo.location.type = 'Point'
  //     await currentBlumo.save();
  //   } else {
  //     currentBlumo = await Blumo.create({
  //       date: req.body.date,
  //       radius: req.body.options.radius,
  //       location: { type: 'Point', coordinates: [req.body.options.lat, req.body.options.lng] }
  //     })
  //   }
  //   return res.status(200).json({ message: currentBlumo });
  // }

  public static async fetchBlumos(req: Request, res: Response, next: NextFunction) {
    const blumos = await Blumo.find({ date: req.query.date })
    return res.status(200).json({ blumos });
  }

  public static deleteBlumo(req: Request, res: Response, next: NextFunction) {
    let blumo = false;
    if ((req.query.id).toString().match(/^[0-9a-fA-F]{24}$/)) {
      Blumo.findByIdAndDelete(req.query.id).exec()
        .then(_res => {
          blumo = true;
        })
        .catch(_err => {
          blumo = false;
        });
    } else {
      blumo = true
    }
    return res.status(200).json({ blumo });
  }

  public static async fetchPublishedBlumos(req: Request, res: Response, next: NextFunction) {
    let amount = {} as any;
    const blumos = await Blumo.find({ date: req.query.date })
    blumos.forEach(async (blumo, index, arr) => {
      const blumolatLon = [blumo.location.coordinates[0], blumo.location.coordinates[1]];
      const blumoCircle = { $center: [blumolatLon, blumo.radius] };
      let counter = 0;
      const donators = await Donator.find({ location: { $geoWithin: blumoCircle } }).where('timeSlots.date').equals(req.query.date);
      donators.forEach(donator => {
        // @ts-ignore
        const distance = getDistance({ latitude: blumolatLon[0], longitude: blumolatLon[1] },
          // @ts-ignore
          { latitude: donator.location.coordinates[0], longitude: donator.location.coordinates[1] });
        if (distance <= donator.distance) {
          counter++;
        }
      });
      amount[blumo.id] = counter;
      if (!arr[index + 1]) {
        setTimeout(() => {
          res.status(200).json({ blumos: blumos, amount: amount });
        }, 0);
      }
    });
    if (blumos.length === 0) {
      res.status(200).json({ blumos: blumos, amount: amount });
    }
  }

  public static async publishMail(req: Request, res: Response, next: NextFunction) {
    const blumo = await Blumo.create({
      date: req.body.date,
      radius: req.body.radius,
      location: { type: 'Point', coordinates: [req.body.lat, req.body.lng] },
      from: req.body.from,
      till: req.body.till
    })
    if (!blumo) { return res.status(400).json({ msg: 'failed' }); }
    blumo.till = req.body.till;
    blumo.from = req.body.from;
    blumo.date = req.body.date;
    // radius is in km
    const blumolatLon = [blumo.location.coordinates[1], blumo.location.coordinates[0]];
    const blumoCircle = { $center: [blumolatLon, blumo.radius] };
    const blumoDate = blumo.date;
    blumo.save();
    // Find users in blumo circle
    Donator.find({ location: { $geoWithin: blumoCircle } }).where('timeSlots.date').equals(blumoDate).then(async donators => {
      // check if user woul walk to blumo
      const mails: string[] = [];

      donators.forEach(donator => {
        // @ts-ignore
        const distance = getDistance({ latitude: blumolatLon[0], longitude: blumolatLon[1] },
          // @ts-ignore
          { latitude: donator.location.coordinates[1], longitude: donator.location.coordinates[0] });
        // Todo Check time slot
        if (distance <= donator.distance) {
          mails.push(donator.email);
        }
      });

      console.log(mails.join(', '));

      // Todo Write mail text
      if (mails.length > 0) {
        await Mailer.sendMail(mails.join(', '), 'Blutspendetermin', '<p>Toller <br> Text</p>');
      }
      res.status(200).json({ msg: mails.length, blumo: blumo });
    }).catch(e => res.status(500).json({ msg: e }));
  }
}
