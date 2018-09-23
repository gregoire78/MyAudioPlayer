import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLList as ListType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
  } from 'graphql';

  const disk = new ObjectType({name: 'disk', fields: { no: StringType, of: StringType }});
  const track = new ObjectType({name: 'track', fields: { no: StringType, of: StringType }});
  const AudioItemType = new ObjectType({
    name: 'AudioItem',
    fields: {
      track: {type : StringType},
      disk: {type : StringType},
      picture: { type: StringType},
      album: { type: StringType },
      artist: { type: StringType },
      artists: { type: StringType },
      title: { type: StringType },
    },
  });

  export default AudioItemType;