import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { icon, Marker, Map } from 'leaflet';
import { RefillService } from '../../services/refill.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  map: Map;
  profileForm: FormGroup;
  userMarker: Marker;
  distanceMarker;
  centersMarker = [];
  showMap = false;

  distance = 2000;
  minDate = new Date();
  currentDateSettings = {date: new Date(), from: '10:00', till: '18:00'};
  dates = [];
  bloodCenters = [];

  iconDefault = icon({
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    iconUrl: 'assets/marker-icon.png',
    shadowUr: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  tiles = {
    osm: [
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ',
      'Karte <a href="https://www.openstreetmap.org/copyright">Openstreetmap</a> ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Kartendaten ' +
      '<a href="http://openstreetmap.org/">Openstreetmap</a> <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>'
    ],
    carto: [
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png ',
      'Karte <a href="https://carto.com/attribution">Carto</a>' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Kartendaten' +
      '<a href="http://openstreetmap.org/">Openstreetmap</a> <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>'
    ]
  };

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private refillService: RefillService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required],
      distance: [2000, Validators.required]
    });
  }

  getPointInMap() {
    this.showMap = true;
    const search = this.profileForm.get('street').value + ', ' +
      this.profileForm.get('zip').value + ' ' + this.profileForm.get('city').value;
    const url = 'https://nominatim.openstreetmap.org/search?q=' + encodeURI(search) + '&format=json&polygon=1&addressdetails=1';
    this.httpClient.get(url).toPromise().then(res => {
      if (res) {
        this.profileForm.get('lat').setValue(res[0].lat);
        this.profileForm.get('lon').setValue(res[0].lon);
        this.initMap(res[0].lat, res[0].lon);
      } else {
        alert('Wohnst du hinter dem Mond? Konnten nichts finden.');
      }
    });
  }

  initMap(lat, lon) {
    if (!this.map) {
      Marker.prototype.options.icon = this.iconDefault;
      this.map = L.map('map').setView([lat, lon], 13);
      L.tileLayer(this.tiles.osm[0], {
        attribution: this.tiles.osm[1] + ' | bralab',
        maxZoom: 18,
        minZoom: 6
      }).addTo(this.map);
      L.control.scale().addTo(this.map);
    }
    this.map.setView([lat, lon], 13);

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    this.userMarker = L.marker([lat, lon]);
    this.userMarker.addTo(this.map);
    this.setDistanceMarker(this.distance);
  }

  setDistanceMarker(meter) {
    this.profileForm.get('distance').setValue(meter);
    meter = meter ? meter : 0;
    if (this.distanceMarker) {
      this.map.removeLayer(this.distanceMarker);
    }
    this.distanceMarker = L.circle([this.profileForm.get('lat').value, this.profileForm.get('lon').value],
      { radius: meter }).addTo(this.map);

    this.getInformationCenters();
  }

  addDate() {
    const date = JSON.parse(JSON.stringify(this.currentDateSettings));
    date.date = moment(date.date).format('YYYY-MM-DD');
    this.dates.push(date);
  }

  removeDate(date) {
    this.dates = this.dates.filter(x => x !== date);
  }

  getInformationCenters() {
    this.centersMarker.forEach(x => {
      this.map.removeLayer(x);
    });

    const body = {};
    body['lat'] = this.profileForm.get('lat').value;
    body['lon'] = this.profileForm.get('lon').value;
    body['distance'] = this.profileForm.get('distance').value;

    this.refillService.getDonationCenters(body).toPromise().then(centers => {
      centers['donationCenters'].forEach(center => {
        const marker = L.marker([center.location.coordinates[0], center.location.coordinates[1]]);
        marker.addTo(this.map);
        this.centersMarker.push(marker);
      });
      this.bloodCenters = centers['donationCenters'];
    } );
  }

  submitForm() {
    const data = this.profileForm.getRawValue();
    data['timeSlots'] = this.dates;
    this.refillService.addDonator(data).toPromise()
      .then(donator => this.router.navigate(['thanks'], {state: donator}))
      .catch(e => alert(e.msg));
  }
}
