import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';

import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import { baseOptions } from './options';
// import accessibility from 'highcharts/modules/accessibility';

// accessibility(Highcharts);
exporting(Highcharts);
drilldown(Highcharts);

// accessibility(Highcharts);
exporting(HighMaps);
drilldown(HighMaps);

Highcharts.setOptions(baseOptions);
HighMaps.setOptions(baseOptions);
