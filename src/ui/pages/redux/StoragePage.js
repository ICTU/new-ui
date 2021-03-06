var _,
  bucketSearchChanged,
  connect,
  copyBucketRequest,
  deleteBucketRequest,
  mapDispatchToProps,
  mapStateToProps,
  openBucketPageRequest;

_ = require("lodash");

({ connect } = require("react-redux"));

({ bucketSearchChanged } = require("../../../redux/actions/search"));

({
  openBucketPageRequest,
  copyBucketRequest,
  deleteBucketRequest
} = require("../../../redux/actions/buckets"));

mapStateToProps = function(state, { params }) {
  var ds, dsTotal, dsUsed, ref, ref1, searchVal;
  ds = state.collections.dataStore;
  searchVal = ((ref = state.search) != null ? ref.bucket_search : void 0) || "";
  return {
    dataStore: {
      total: (dsTotal = parseInt((ds != null ? ds.total : void 0) || 0, 10)),
      used: (dsUsed = parseInt((ds != null ? ds.used : void 0) || 0, 10)),
      free: dsTotal - dsUsed
    },
    selectedBucket: params.name,
    isCopy: params.type === "copy",
    isDelete: params.type === "delete",
    searchValue: searchVal,
    totalResults:
      ((ref1 = state.collections.buckets) != null ? ref1.length : void 0) || 0,
    buckets: _.filter(state.collections.buckets, function(bucket) {
      var ref2;
      return (ref2 = bucket.name) != null ? ref2.match(searchVal) : void 0;
    })
  };
};

mapDispatchToProps = function(dispatch) {
  return {
    onBucketSearchChanged: function(value) {
      return dispatch(bucketSearchChanged(value));
    },
    onClearSearch: function() {
      return dispatch(bucketSearchChanged(""));
    },
    onActionMenuClose: function(bucketName) {
      return dispatch(openBucketPageRequest(bucketName));
    },
    onCopy: function(fromBucket, toBucket) {
      dispatch(copyBucketRequest(fromBucket, toBucket));
      return dispatch(openBucketPageRequest(toBucket));
    },
    onDelete: function(bucket) {
      dispatch(deleteBucketRequest(bucket));
      return dispatch(openBucketPageRequest(bucket));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(
  require("../StoragePage")
);
