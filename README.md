# slovak-eye web services
## About SlovakEye
> The aim was to publish and share data from Sentinel II mission and basic derivates from this data. We use Level 1C (georeferenced) imagery which covers the area of Slovakia shared by the Slovak environment agency. Final dataset should be accessible trough WMS and WCS.

## INSPIRE view and download services for the Land Cover datasets
### View service endpoint (WMS)
http://data.datacove.eu:8080/geoserver/slovak-eye/wms?request=GetCapabilities

### Download service endpoint (WCS)
http://data.datacove.eu:8080/geoserver/slovak-eye/wcs?request=GetCapabilities

### Dataset download WCS TIFF

Sentinel_SR: http://data.datacove.eu:8080/geoserver/slovak-eye/wcs?service=WCS&version=2.0.1&request=GetCoverage&coverageId=Sentinel_SR

Sentinel_SR_Resample: http://data.datacove.eu:8080/geoserver/slovak-eye/wcs?service=WCS&version=2.0.1&request=GetCoverage&coverageId=Sentinel_SR

## INSPIRE metadata
View Service: https://bolegweb.geof.unizg.hr/pycsw/datacove?service=CSW&version=2.0.2&request=GetRecordById&id=urn:uuid:82460794-d5a6-4c5b-8a40-b61c362dfc01&outputSchema=http://www.isotc211.org/2005/gmd

Download Service: https://bolegweb.geof.unizg.hr/pycsw/datacove?service=CSW&version=2.0.2&request=GetRecordById&id=urn:uuid:83339ca2-2c6c-402b-a869-96855863a79e&outputSchema=http://www.isotc211.org/2005/gmd

Sentinel_SR dataset: https://bolegweb.geof.unizg.hr/pycsw/datacove?service=CSW&version=2.0.2&request=GetRecordById&outputschema=http://www.isotc211.org/2005/gmd&id=urn:uuid:83339ca2-2c6c-402b-a869-96855863a79e-slovak-eye:Sentinel_SR

Sentinel_SR_Resample: https://bolegweb.geof.unizg.hr/pycsw/datacove?service=CSW&version=2.0.2&request=GetRecordById&outputschema=http://www.isotc211.org/2005/gmd&id=urn:uuid:83339ca2-2c6c-402b-a869-96855863a79e-slovak-eye:sentinel_resample

## Members of project team
Jakub Kočica - Copernicus data expert, email: kubo.kocica@gmail.com

Tomáš Kliment - mentor, INSPIRE expert, email: tomas.kliment@gmail.com
