import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';

import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';

import { baseOptions } from './options';

accessibility(Highcharts);
exporting(Highcharts);
drilldown(Highcharts);

accessibility(HighMaps);
exporting(HighMaps);
drilldown(HighMaps);

Highcharts.setOptions(baseOptions);
HighMaps.setOptions(baseOptions);
