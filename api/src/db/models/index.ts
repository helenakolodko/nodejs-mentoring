import Group from './group';
import User from './user';
import UserGroup from './userGroup';

Group.belongsToMany(User, {
  through: UserGroup,
  as: 'group',
  foreignKey: 'group_id'
});


User.belongsToMany(Group, {
  through: UserGroup,
  as: 'user',
  foreignKey: 'user_id'
});

export { User, Group, UserGroup };
