        const nxnyResponse = await fetch(`/api/get_nx_ny/?location1=${selectedLocation1}&location2=${selectedLocation2}&location3=${selectedLocation3}`);
        const nxnyData = await nxnyResponse.json();
        console.log(nxnyData)