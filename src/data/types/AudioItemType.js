import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
  GraphQLInt as IntType,
  // GraphQLNonNull as NonNull,
} from 'graphql';

const disk = new ObjectType({
  name: 'disk',
  fields: { no: { type: StringType }, of: { type: StringType } },
});
const track = new ObjectType({
  name: 'track',
  fields: { no: { type: StringType }, of: { type: StringType } },
});
const AudioItemType = new ObjectType({
  name: 'AudioItem',
  fields: {
    album: { type: StringType },
    tracks: {
      type: new ListType(
        new ObjectType({
          name: 'tracks',
          fields: {
            track: { type: track },
            disk: { type: disk },
            picture: {
              type: new ListType(
                new ObjectType({
                  name: 'picture',
                  fields: {
                    type: { type: StringType },
                    format: { type: StringType },
                    description: { type: StringType },
                    width: { type: IntType },
                    height: { type: IntType },
                    colour_depth: { type: IntType },
                    indexed_color: { type: IntType },
                    data: { type: StringType },
                  },
                }),
              ),
            },
            artists: { type: new ListType(StringType) },
            artist: { type: StringType },
            title: { type: StringType },
            filepath: { type: StringType },
          },
        }),
      ),
    },
  },
});
/* const AudioItemType = new ObjectType({
    name: 'AudioItem',
    fields: {
      track: {type : track},
      disk: {type : disk},
      picture: { type: new ListType(new ObjectType({name: 'picture', fields: {type: {type: StringType}, format: {type: StringType}, description: {type: StringType}, width: {type: IntType}, height: {type: IntType}, colour_depth: {type: IntType}, indexed_color: {type: IntType}, data: {type: StringType} }}))},
      album: { type: StringType },
      artists: { type: new ListType(StringType) },
      artist: { type: StringType },
      title: { type: StringType },
    },
  }); */

export default AudioItemType;
