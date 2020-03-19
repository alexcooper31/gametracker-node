import assert from 'assert';

const {
  MAIN_DOMAIN,
  JWT_SECRET,
  PORT,
  NODE_ENV,
  MONGO_URI,
  IGDB_KEY,
} = process.env;

abstract class Environment {
  private static variables: Map<string, string | undefined> = new Map(
    [
      ['MAIN_DOMAIN', MAIN_DOMAIN],
      ['JWT_SECRET', JWT_SECRET],
      ['PORT', PORT],
      ['NODE_ENV', NODE_ENV],
      ['MONGO_URI', MONGO_URI],
      ['IGDB_KEY', IGDB_KEY],
    ],
  );

  static assertRequired(): void {
    for (const i of this.variables.entries()) {
      assert(i[1], new Error(`Required environment variable ${i[0]} not set.`));
    }
  }

  public static variable(key: string): string {
    const value = this.variables.get(key);

    if (!value) {
      throw new Error('Empty environment variable.');
    }

    return value;
  }
}

export default Environment;
