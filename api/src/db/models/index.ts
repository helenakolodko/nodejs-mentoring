import Group from './group';
import User from './user';
import UserGroup from './userGroup';

Group.belongsToMany(User, {
  through: UserGroup,
  as: 'group',
  foreignKey: 'group_id',
  onDelete: "CASCADE"
});


User.belongsToMany(Group, {
  through: UserGroup,
  as: 'user',
  foreignKey: 'user_id',
  onDelete: "CASCADE"
});

export { User, Group, UserGroup };
