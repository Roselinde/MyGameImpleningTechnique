using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;
using System;

public class Network : MonoBehaviour {

    static SocketIOComponent socket;

    public GameObject playerPrefab;

	// Use this for initialization
	void Start () {

        socket = GetComponent<SocketIOComponent>();
        socket.On("open", OnConnected);
        socket.On("spawn", OnSpawned);
	}

    private void OnSpawned(SocketIOEvent e)
    {
        print("spawned");
        Instantiate(playerPrefab);
    }

    void OnConnected(SocketIOEvent e)
    {
        print("Connected");

        JSONObject j = 
            new JSONObject(JSONObject.Type.OBJECT);

        j.AddField("id", "53XXXXX");
        j.AddField("name", "Sumeth");

        socket.Emit("checkin", j);
    }

    // Update is called once per frame
    void Update () {
		
	}
}
