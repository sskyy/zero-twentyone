module.exports = [
  {
    identity: 'artwork',
    connection: 'localDisk',
    attributes: {
      title: 'string'
    },
    rest: true,
    isNode: true
  },
  {
    identity: 'attachment',
    connection: 'localDisk',
    attributes: {
    },
    rest: true,
    isFile: true,
    storage: 'upyun'
  },
  {
    identity: 'avatar',
    connection: 'localDisk',
    attributes: {
    },
    rest: true,
    isFile: true
  },
  {
    identity : 'tag',
    connection :'localDisk',
    attributes : {},
    rest: true,
    isIndex : true
  }
]