var UpgradeData = {
  inventory1: {
    description: "Add 5 more spots to inventory space.",
    cost: 10,
    process: function(data) {
      data.maxInventory += 5;

      return data;
    }
  },
  inventory2: {
    description: "Add 5 more spots to inventory space.",
    cost: 50,
    process: function(data) {
      data.maxInventory += 5;

      return data;
    }
  },
  inventory3: {
    description: "Add 5 more spots to inventory space.",
    cost: 200,
    process: function(data) {
      data.maxInventory += 5;

      return data;
    }
  },
  inventory4: {
    description: "Add 5 more spots to inventory space.",
    cost: 500,
    process: function(data) {
      data.maxInventory += 5;

      return data;
    }
  },
  inventory5: {
    description: "Add 5 more spots to inventory space.",
    cost: 1000,
    process: function(data) {
      data.maxInventory += 5;

      return data;
    }
  },
  mutation1: {
    description: "Double Chances of Mutation",
    cost: 10,
    process: function(data) {
      data.mutationChance *= 2;

      return data;
    }
  },
  mutation2: {
    description: "Double Chances of Mutation",
    cost: 50,
    process: function(data) {
      data.mutationChance *= 2;

      return data;
    }
  },
  mutation3: {
    description: "Double Chances of Mutation",
    cost: 200,
    process: function(data) {
      data.mutationChance *= 2;

      return data;
    }
  },
  mutation4: {
    description: "Double Chances of Mutation",
    cost: 500,
    process: function(data) {
      data.mutationChance *= 2;

      return data;
    }
  },
  mutation5: {
    description: "Double Chances of Mutation",
    cost: 1000,
    process: function(data) {
      data.mutationChance *= 2;

      return data;
    }
  },
  breeder1: {
    description: "Adds Another Breeder Box",
    cost: 100,
    process: function(data) {
      data.breederCount += 1;

      return data;
    }
  },
  breeder2: {
    description: "Adds Another Breeder Box",
    cost: 250,
    process: function(data) {
      data.breederCount += 1;

      return data;
    }
  },
  breederTime1: {
    description: "Reduce Breeder Time by 25%",
    cost: 100,
    process: function(data) {
      data.breederTime *= .75;

      return data;
    }
  },
  breederTime2: {
    description: "Reduce Breeder Time by 25%",
    cost: 250,
    process: function(data) {
      data.breederTime *= .75;

      return data;
    }
  },
  breederTime3: {
    description: "Reduce Breeder Time by 25%",
    cost: 1000,
    process: function(data) {
      data.breederTime *= .75;

      return data;
    }
  },
  sellExcess: {
    description: "Sell Clovers Instead of Discarding Them",
    cost: 250,
    process: function(data) {
      data.breederTime *= .75;

      return data;
    }
  },
};

export default UpgradeData;