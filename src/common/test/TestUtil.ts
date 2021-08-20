import { Provider } from 'src/providers/entities/provider.entity';

export class TestUtil {
  static giveAMeValideProvider(): Provider {
    const provider = new Provider();
    provider.id = 1;
    provider.name = 'Valid Name';
    provider.cpf = 'cpfvalidxxx';
    provider.email = 'valid@email.com';
    provider.password = 'passwordvalid';
    provider.isSeller = false;
    provider.birthDate = new Date('2018-08-20');
    provider.startDate = new Date(Date.now());
    provider.createdAt = new Date(Date.now());
    provider.updatedAt = new Date(Date.now());

    return provider;
  }
}
