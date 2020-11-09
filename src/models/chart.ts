import { Effect, ImmerReducer, Subscription } from 'umi';
import { g2Req, g6Req } from '@/service';
import { Chart } from '@antv/g2';
import G6 from '@antv/g6';
interface chartModelStateType {}
interface chartModelType {
  namespace: string;
  state: chartModelStateType;
  effects: {
    getG2Data: Effect;
    getG6Data: Effect;
  };
  reducers: {
    // REGISTER: ImmerReducer<userModelStateType>;
  };
}

const chartModel: chartModelType = {
  namespace: 'chart',
  state: {},
  effects: {
    *getG2Data({ payload }, { call, put }) {
      const data = yield call(g2Req);
      const years = Object.keys(data);
      const colorsMap = {
        'Europe & Central Asia': '#f49d37',
        'East Asia & Pacific': '#f03838',
        'South Asia': '#35d1d1',
        'Middle East & North Africa': '#5be56b',
        'Sub-Saharan Africa': '#4e7af0',
        America: '#ebcc21',
      };

      let count = 0;
      let chart;
      let interval;

      function countUp() {
        const year = years[count];
        if (count === 0) {
          chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 500,
          });
          chart.data(data[year]);
          chart.scale({
            life: {
              min: 0,
              max: 90,
              tickInterval: 10,
              alias: 'Life expectancy',
            },
            income: {
              type: 'log',
              max: 150000,
              min: 100,
              alias: 'Income',
            },
            country: {
              key: true, // 自定义每条数据的 id
            },
            population: {
              type: 'pow',
              base: 2,
            },
            continent: {
              values: [
                'East Asia & Pacific',
                'South Asia',
                'Sub-Saharan Africa',
                'Middle East & North Africa',
                'Europe & Central Asia',
                'America',
              ],
            },
          });

          // 配置 tooltip
          chart.tooltip({
            showMarkers: false,
            title: 'country',
          });

          // 配置图例
          chart.legend('population', false);
          chart.legend('continent', {
            flipPage: false,
            position: 'bottom-left',
          });

          // 坐标轴配置
          chart.axis('life', {
            title: {
              style: {
                fill: '#8C8C8C',
                fontSize: 14,
              },
            },
            line: {
              style: {
                stroke: '#D9D9D9',
              },
            },
          });
          chart.axis('income', {
            title: {
              style: {
                fill: '#8C8C8C',
                fontSize: 14,
              },
            },
            grid: {
              line: {
                style: {
                  stroke: '#D9D9D9',
                },
              },
            },
          });

          // 绘制散点图
          chart
            .point()
            .position('income*life')
            .color('continent', val => colorsMap[val])
            .size('population', [1, 25])
            .shape('circle')
            .animate({
              update: {
                duration: 200,
                easing: 'easeLinear',
              },
            })
            .tooltip('life*income*population')
            .style({
              stroke: '#000',
            });

          // 绘制标注文本
          chart.annotation().text({
            position: ['50%', '50%'],
            content: year,
            style: {
              fontSize: 200,
              fill: '#999',
              textAlign: 'center',
              fillOpacity: 0.3,
            },
            top: false,
            animate: false,
          });
          chart.render();
        } else if (count < years.length) {
          chart.annotation().clear(true);
          chart.annotation().text({
            position: ['50%', '50%'],
            content: year,
            style: {
              fontSize: 200,
              fill: '#999',
              textAlign: 'center',
              fillOpacity: 0.3,
            },
            top: false,
            animate: false,
          });
          chart.changeData(data[year]);
        }

        ++count;

        if (count === years.length) {
          clearInterval(interval);
        }
      }

      countUp();
      interval = setInterval(countUp, 200);
    },
    *getG6Data({ payload }, { call, put }) {
      const data = yield call(g6Req);
      //第三方库实例化
      const width = 500;
      const height =  500
      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const data = item.get('model').data;
                data.collapsed = collapsed;
                return true;
              },
            },
            'drag-canvas',
            'zoom-canvas',
          ],
        },
        defaultNode: {
          size: 26,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF',
          },
        },
        layout: {
          type: 'mindmap',
          direction: 'H',
          getHeight: () => {
            return 16;
          },
          getWidth: () => {
            return 16;
          },
          getVGap: () => {
            return 10;
          },
          getHGap: () => {
            return 50;
          },
          getSide: d => {
            if (d.id === 'Classification') {
              return 'left';
            }
            return 'right';
          },
        },
      });

      let centerX = 0;
      graph.node(function(node) {
        if (node.id === 'Modeling Methods') {
          centerX = node.x;
        }

        return {
          label: node.id,
          labelCfg: {
            position:
              node.children && node.children.length > 0
                ? 'left'
                : node.x > centerX
                ? 'right'
                : 'left',
            offset: 5,
          },
        };
      });

      graph.data(data);
      graph.render();
      graph.fitView();
    },
  },
  reducers: {},
};

export default chartModel;