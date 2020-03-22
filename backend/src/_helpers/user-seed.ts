import { User, Role } from '../api/models/user.model';

export async function seedUsers() {
    const adminRole = new Role({
        name: 'admin'
    });

    User.findOne({ username: 'test@user.de'}, function (err, user) {
        if (err) { console.log('Something wrong with seeding :('); }
        if (user) {
            console.log('Already seeded - skipping');
        } else {
            Role.create(adminRole).then( role => {
                const user = new User({
                    username: 'test@user.de',
                    password: 'password1234',
                    role: [role._id]
                  });
                User.create(user);
            });
        }
    });
}
