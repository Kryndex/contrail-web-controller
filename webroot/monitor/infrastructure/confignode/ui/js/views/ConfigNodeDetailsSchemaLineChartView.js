/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
], function (_, ContrailView) {
    var ConfigNodeDetailsSchemaLineChartView = ContrailView.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var self = this;

            self.renderView4Config(this.$el, this.model,
                    getConfigNodeDetailLineChartViewConfig(viewConfig));
        }
    });

    var getConfigNodeDetailLineChartViewConfig = function (viewConfig, endTime) {
        return {
            elementId: ctwl.CONFIGNODE_DETAILS_SCHEMA_CHART_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwl.CONFIGNODE_DETAILS_SCHEMA_LINE_CHART_ID,
                                view: "LineBarWithFocusChartView",
                                viewConfig: {
                                    parseFn: function (response) {
                                        var dimensions = ['cpu_info.cpu_share', 'cpu_info.mem_res'];
                                        var axisLabels = [ctwl.TITLE_CPU,ctwl.TITLE_MEMORY];
                                        var options = {dimensions:dimensions,axisLabels:axisLabels};
                                        return ctwp.parseLineChartDataForNodeDetails(response,options);
                                    },
                                    chartOptions: {
                                        y1AxisLabel:ctwl.TITLE_CPU,
                                        y2AxisLabel:ctwl.TITLE_MEMORY,
                                        forceY1: [0, 1]
                                    },
                                    widgetConfig: {
                                        elementId: ctwl.CONFIGNODE_DETAILS_SCHEMA_CHART_WIDGET,
                                        view: "WidgetView",
                                        viewConfig: {
                                            header: {
                                                title: ctwl.TITLE_CONFIGNODE_SCHEMA_CPU_MEM_UTILIZATION,
                                            },
                                            controls: {
                                                top: {
                                                    default: {
                                                        collapseable: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    return ConfigNodeDetailsSchemaLineChartView;
});