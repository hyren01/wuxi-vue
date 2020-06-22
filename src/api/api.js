// let baseUrl = 'https://easy-mock.com/mock/5d5baa29094df10de7c80d16/std';
let baseUrl = 'http://192.168.3.168:8088';
let stdglprj = baseUrl + '/stdglprj';
export default {
    // DATASOURCE_ALL_GET: stdglprj + '/dataQuality/allDBs', //查询库名
    DATASOURCE_ALL_GET: 'https://easy-mock.com/mock/5d5baa29094df10de7c80d16/std/getAllDataSource',
    TABLENAME_ALL_GET: stdglprj + '/dataQuality/allTablesByDBInfo', //查询表名
    FIEIDS_BY_TABLENAME_GET: stdglprj + '/dataQuality/allFieldsByTableName', // 根据表名查询所有字段信息
    STD_CODE_GET: stdglprj + '/dataQuality/tbStdCode', //查询码表列表
    STD_CODE_INFO: stdglprj + '/dataQuality/tbStdCodeInfo', //根据码表编码获得码值
    DRIVER_GET: stdglprj + '/dataQuality/getDBDriver', //数据库驱动获取接口
    CEHCK_URL_POST: stdglprj + '/dataCheck/runQualityCheck', //检测接口
    TEST_CONNECTION_GET: stdglprj + '/dataQuality/testConnection', //测试连接
    // 检测列表
    // /dataCheck/getQualityInfo
    QUALITY_INFO_GET: stdglprj + '/dataCheck/getQualityInfo', //检测结果列表
    CHECK_DETAIL_GET: stdglprj + '/dataCheck/getDetailData/{id}', //检测明细
    DELETE_QUALITY_GET: stdglprj + '/dataCheck/delQualityInfo/{id}', //删除
    Driver: 'com.mysql.jdbc.Driver',

}