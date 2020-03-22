import { NextFunction, Request, Response } from 'express';
import { Donator } from '../models/donator.model';
import { Donation } from '../models/donation.model';


export class RefillController {

  public static findDonationCenters(req: Request, res: Response, next: NextFunction) {
    const donatorRadius = req.body.distance / 100000;
    const donatorLatLon = [req.body.lat, req.body.lon];
    const donatorCircle = { $center: [donatorLatLon, donatorRadius] };
    Donation.find({ location: { $geoWithin: donatorCircle } }).then(async donationCenters => {
      res.status(200).json({ donationCenters: donationCenters });
    }).catch(e => res.status(500).json({ msg: e }));
  }

  public static addDonator(req: Request, res: Response, next: NextFunction) {
    const donater = req.body;
    donater.location = {
      type: 'Point',
      'coordinates' : [
        donater.lat,
        donater.lon
      ]
    };

    Donator.create(donater).then(donator =>
      res.status(200).json({ donator, msg: 'created' })
    ).catch(() =>
     res.status(500).json({ msg: 'Not Worked' })
    );
  }
}
