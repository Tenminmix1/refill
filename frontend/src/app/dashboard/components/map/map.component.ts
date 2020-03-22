import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { Marker, icon } from 'leaflet';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { PublishComponent } from '../publish/publish.component';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit, OnChanges {
  @Input() date;
  @Output() blumoId = new EventEmitter();
  lat = 51.0;
  lng = 7.5;
  map;
  radius;
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



  blumoMarkerFormat = {
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    iconUrl: 'assets/marker-icon.png',
    shadowUr: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    color: 'red',
    draggable: true
  };

  bloodIcon = L.icon({
    iconUrl: '/assets/images/drop.svg',
  });

  donatorCircleFormat = {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.2,
    radius: 2000
  };

  blumoCircleFormat = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
  };
  blumoMarker;
  blumoCircle;
  lastId = 1;
  currentId;
  blumos = [];
  blumoPolygons = [];
  donators = [];

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

  constructor(
    private dashboardApiService: DashboardService,
    private matDialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.map = L.map('map').setView([this.lat, this.lng], 13);
    Marker.prototype.options.icon = this.iconDefault;
    this.map.flyTo([51.962944, 7.628694], 13);
    L.tileLayer(this.tiles.osm[0], {
      attribution: this.tiles.osm[1] + ' | bralab',
      maxZoom: 18,
      minZoom: 6
    }).addTo(this.map);
    L.control.scale().addTo(this.map);
    this.setCircles();
    this.map.on('click', this.mapClick);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dashboardApiService.fetchDonators(moment(changes.date.currentValue).format('YYYY-MM-DD')).toPromise().then(donators => {
      this.donators.forEach(donator => {
        donator.circle.remove();
        donator.marker.remove();
      });
      this.donators = donators['donators'] ? donators['donators'] : [];
      this.dashboardApiService.fetchBlumoConfigs(moment(changes.date.currentValue).format('YYYY-MM-DD')).toPromise().then(blumos => {
        this.blumoPolygons.forEach(polygon => {
          polygon.circle.remove();
          polygon.marker.remove();
        });
        this.blumos = blumos['blumos'];
        this.setCircles();
      });
      this.updateDonators(true, null, null);
    });
  }

  setPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.map.flyTo([this.lat, this.lng], 13);
  }

  mapClick(e) {
    console.log('latLng: ' + e.latlng);
  }

  setCircles() {
    this.blumos.forEach(blumo => {
      const currentMarker = L.marker(
        blumo.location.coordinates,
        { color: this.blumoMarkerFormat.color, draggable: false, id: blumo._id }).addTo(this.map);
      const currentCircle = L.circle(
        blumo.location.coordinates,
        {
          ...this.blumoCircleFormat,
          id: blumo._id, radius: blumo.radius
        }).addTo(this.map);
      this.blumoPolygons.push({
        marker: currentMarker,
        circle: currentCircle
      });
      this.helperMarker(currentMarker, currentCircle, false);
      this.updateDonators(true, currentMarker, currentCircle, true);
    });
  }

  updateDonators(addMarkers = true, currentMarker, currentCircle, fixed = false) {
    const mapDonator = [];
    const zombies = [];
    let source = currentMarker ? currentMarker.getLatLng() : 0;
    let radius = currentCircle ? currentCircle.getRadius() : 0;
    this.donators.forEach(donator => {
      const latLng = new L.latLng(donator.location.coordinates);
      if (currentMarker && latLng.distanceTo(source) <= Math.min(donator.distance)) {
        mapDonator.push(donator);
      } else {
        zombies.push(donator);
      }
      if (addMarkers && !donator['marker']) {
        donator['marker'] = L
          .marker(latLng)
          .addTo(this.map)
          .bindPopup(
            '<b>' + donator.email + '</b>'
          );


        this.donatorCircleFormat.radius = donator.distance;
        donator['circle'] = L
          .circle(latLng, this.donatorCircleFormat)
          .addTo(this.map);
      }
      if (currentMarker !== null) {
        source = currentMarker.getLatLng();
        radius = currentCircle.getRadius();
        if (fixed) {
          currentMarker.bindPopup(
            '<b>Published</b> <br/> <b>BluMoId:</b> ' + currentMarker.options.id +
            '<br/>Spender: ' +
            String(mapDonator.length) +
            '<br/> Nichtspender: ' +
            String(zombies.length)
          ).openPopup();
          currentMarker.on('click', (event) => {
            this.blumoId.emit(currentMarker.options.id);
            this.currentId = undefined;
          });
        } else {
          currentMarker.bindPopup(
            '<b>MOVE ME!</b> <br/>Spender: ' +
            String(mapDonator.length) +
            '<br/> Nichtspender: ' +
            String(zombies.length)
          ).openPopup();
        }
      }
    });
    if (this.donators.length === 0 && currentMarker !== null) {
      source = currentMarker.getLatLng();
      radius = currentCircle.getRadius();
      if (fixed) {
        currentMarker.bindPopup(
          '<b>Published</b> ' +
          '<br/>Spender: ' +
          String(mapDonator.length) +
          '<br/> Nichtspender: ' +
          String(zombies.length)
        ).openPopup();
        currentMarker.on('click', (event) => {
          this.blumoId.emit(currentMarker.options.id);
        });
      } else {
        currentMarker.bindPopup(
          '<b>MOVE ME!</b> <br/>Spender: ' +
          String(mapDonator.length) +
          '<br/> Nichtspender: ' +
          String(zombies.length)
        ).openPopup();
      }
    }
  }

  onUpdateCircle() {
    this.blumoPolygons.forEach(blumoPolygon => {
      if (blumoPolygon.marker.options.id === this.currentId) {
        blumoPolygon.circle._mRadius = this.radius;
        blumoPolygon.circle.options.radius = this.radius;
        blumoPolygon.circle.setLatLng(new L.LatLng(blumoPolygon.marker._latlng.lat, blumoPolygon.marker._latlng.lng));
      }
    });
    // this.map.removeLayer(this.blumoCircle);
    // this.blumoCircleFormat.radius = this.radius;
    // this.blumoCircle = L.circle(this.blumoMarker.getLatLng(), this.blumoCircleFormat).addTo(this.map);
  }

  onAddBlumo() {
    this.lastId++;
    const currentMarker = L.marker(
      [this.map._lastCenter.lat, this.map._lastCenter.lng],
      { ...this.blumoMarkerFormat, id: this.lastId }).addTo(this.map);
    const currentCircle = L.circle(
      [this.map._lastCenter.lat, this.map._lastCenter.lng],
      { ...this.blumoCircleFormat, id: this.lastId, radius: 2000 }).addTo(this.map);
    this.blumoPolygons.push({
      marker: currentMarker,
      circle: currentCircle
    });
    this.helperMarker(currentMarker, currentCircle, true);
  }

  onDeleteBlumo() {
    const index = this.blumoPolygons.findIndex(polygon => polygon.circle.options.id === this.currentId);
    this.dashboardApiService.deleteBlumo(this.currentId).toPromise().then(res => {
      const polygons = this.blumoPolygons[index];
      polygons.marker.remove();
      polygons.circle.remove();
      this.blumoPolygons.splice(index, 1);
      this.currentId = undefined;
      this.radius = 0;
    });
  }

  onPublicBlumo() {
    const config = this.getConfig();
    if (config['radius'] !== this.radius) {
      this.toastr.warning(this.translateService.instant('DASHBOARD.MAP.RADIUS_WARN') + ' ' + config['radius'] / 1000 + 'km');
    }
    const dialogRef = this.matDialog.open(PublishComponent, {
      width: '300px',
      data: { id: this.currentId, config: this.getConfig(), date: this.date }
    });

    dialogRef.afterClosed().toPromise().then(res => {
      if (res.blumo) {
        this.blumoPolygons.forEach(polygon => {
          if (this.currentId === polygon.marker.options.id) {
            const currentMarker = L.marker(
              polygon.marker._latlng,
              {
                color: this.blumoMarkerFormat.color,
                draggable: false,
                id: res.blumo._id
              }).addTo(this.map);
            polygon.marker.remove();
            this.updateDonators(true, currentMarker, polygon.circle, true);
          }
        });
        this.currentId = undefined;
        this.radius = 0;
      }
    });
  }

  private helperMarker(currentMarker, currentCircle, drag) {
    if (drag) {
      currentMarker.on('dragend', (event) => {
        currentMarker = event.target;
        const position = currentMarker.getLatLng();
        this.currentId = event.target.options.id;
        this.radius = currentCircle.options.radius;
        currentMarker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
        currentCircle.setLatLng(new L.LatLng(position.lat, position.lng));
        this.updateDonators(true, currentMarker, currentCircle);
      });
      currentMarker.on('click', (event) => {
        this.currentId = event.target.options.id;
        this.radius = currentCircle.options.radius;
      });
    }
  }

  private getConfig() {
    let options = {};
    this.blumoPolygons.forEach(blumoPolygon => {
      if (blumoPolygon.marker.options.id === this.currentId) {
        options = {
          ...blumoPolygon.circle._latlng, radius: blumoPolygon.circle.options.radius
        };
      }
    });
    return options;
  }
}
