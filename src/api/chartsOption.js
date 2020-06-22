const option = {
  tooltip: {
    show: true,
  },
  title: {
    show: true,
    textStyle: {
      color: 'rgba(0, 0, 0 , .87)',
      fontFamily: 'sans-serif'
    }
  },
  grid: {
    containLabel: true,
  },
  xAxis: {
    show: true,
    type: 'category',
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0 , .54)',
        type: 'dashed',
      }
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      lineStyle: {
        show: true,
        color: 'rgba(0, 0, 0 , .54)',
        type: 'dashed'
      }
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0 , .54)',
        type: 'dashed',
      }
    },
    axisLabel: {
      show: false,
      // color: 'rgba(0, 0, 0 , .54)'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        show: true,
        color: 'rgba(0, 0, 0 , .54)',
        type: 'dashed'
      }
    }
  },
  series: [{
    type: 'line'
  }]
};

export default option;